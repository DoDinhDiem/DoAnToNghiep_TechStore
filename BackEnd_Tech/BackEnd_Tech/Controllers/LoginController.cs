using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Dto;
using BackEnd_Tech.Models.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;


namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private TechStoreContext _context;
        private AppSettings _appSettings;
        private readonly MailSettings _mailSettings;
        private static Random random = new Random();
        private const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
        private const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string Digits = "0123456789";
        private const string SpecialCharacters = "!@#$%^&*()_+-=[]{}|;:'\"<>,.?/";
        public LoginController(TechStoreContext context, IOptions<AppSettings> appSetting, IOptions<MailSettings> mailSettings)
        {
            _context = context;
            _appSettings = appSetting.Value;
            _mailSettings = mailSettings.Value;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] NhanVien model)
        {
            if (model == null)
                return BadRequest();

            var user = await _context.NhanViens
                .Include(x => x.Role)
                .Include(x => x.ChucVu)
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
                return NotFound(new { message = "Email không tồn tại! Vui lòng nhập lại." });

            if (!PasswordHasher.VerifyPassword(model.PassWord, user.PassWord))
            {
                return BadRequest(new { Message = "Mật khẩu không đúng! Vui lòng nhập lại." });
            }

            user.Token = CreateJwt(user);
            var passTrue = user.PassTrue ?? false;
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return Ok(new TokenApiDto()
            {
                passTrue = passTrue,
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }
        [Route("RefreshToken")]
        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Yêu cầu của khách hàng không hợp lệ");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = await _context.NhanViens.FirstOrDefaultAsync(u => u.Email == email);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Yêu cầu không hợp lệ");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

        [Route("ResetPass/{email}")]
        [HttpPost]
        public async Task<IActionResult> ResetPassWork(string email)
        {
            try
            {
                var user = await _context.KhachHangs.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return NotFound("Không tìm thấy người dùng với địa chỉ email này.");
                }

                // Gửi email với mã xác thực
                var pass = GenerateRandomPassword();
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
                message.To.Add(new MailboxAddress("", email));
                message.Subject = "Quên mật khẩu";
                message.Body = new TextPart("html")
                {
                    Text = $"<p style='font-size: 18px'>Mật khẩu mới của bạn là: <strong>{pass}</strong></p>"
                };

                user.PassWord = PasswordHasher.HashPassword(pass);
                using (var client = new SmtpClient())
                {
                    client.Connect(_mailSettings.Host, _mailSettings.Port, false);
                    client.Authenticate(_mailSettings.Mail, _mailSettings.Password);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Email đã được gửi thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi máy chủ nội bộ: {ex.Message}");
            }
        }

        [Route("ChangePassWord")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _context.NhanViens.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null)
                {
                    return NotFound(new { Message = "Tài khoản không tồn tại! Vui lòng nhập lại." });
                }

                if (!PasswordHasher.VerifyPassword(model.CurrentPassword, user.PassWord))
                {
                    return BadRequest(new { Message = "Mật khẩu hiện tại không đúng! Vui lòng nhập lại." });
                }

                var passMessage = CheckPasswordStrength(model.NewPassword);
                if (!string.IsNullOrEmpty(passMessage))
                {
                    return BadRequest(new { Message = passMessage });
                }

                user.PassTrue = true;
                user.PassWord = PasswordHasher.HashPassword(model.NewPassword);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Đổi mật khẩu thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private string CreateJwt(NhanVien model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            string roleTenRole = model.Role?.TenRole ?? string.Empty;
            string tenChucVu = model.ChucVu?.TenChucVu ?? string.Empty;

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, roleTenRole),
                new Claim("chucVu", tenChucVu),
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.Name, model.HoTen)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.NhanViens
                .Any(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Mã token không hợp lệ!");
            return principal;

        }

        private string GenerateRandomPassword()
        {
            string password = "";

            password += UppercaseLetters[random.Next(UppercaseLetters.Length)];

            for (int i = 0; i < 7; i++)
            {
                password += GetRandomCharacter();
            }

            password += SpecialCharacters[random.Next(SpecialCharacters.Length)];

            return Shuffle(password);
        }

        private char GetRandomCharacter()
        {
            string allCharacters = LowercaseLetters + Digits;
            return allCharacters[random.Next(allCharacters.Length)];
        }

        private string Shuffle(string str)
        {
            char[] array = str.ToCharArray();
            int n = array.Length;
            while (n > 1)
            {
                n--;
                int k = random.Next(n + 1);
                char value = array[k];
                array[k] = array[n];
                array[n] = value;
            }
            return new string(array);
        }

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("Độ dài mật khẩu tối thiểu phải là 8" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("Mật khẩu phải chứa cả chữ và số" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Mật khẩu phải chứa ký tự đặc biệt" + Environment.NewLine);
            return sb.ToString();
        }
    }
}
