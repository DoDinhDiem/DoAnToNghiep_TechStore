using BackEnd_Tech.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;
using System;
using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginClientController : ControllerBase
    {
        private readonly TechStoreContext _context;
        private AppSettings _appSettings;
        public LoginClientController(TechStoreContext context, IOptions<AppSettings> appSetting)
        {
            _context = context;
            _appSettings = appSetting.Value;
        }

        [Route("Signin")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] KhachHang model)
        {
            if (model == null)
                return BadRequest();

            var query = await _context.KhachHangs
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (query == null)
                return NotFound(new { Message = "Tài khoản không tồn tại! Vui lòng nhập lại." });

            if (!PasswordHasher.VerifyPassword(model.PassWord, query.PassWord))
            {
                return BadRequest(new { Message = "Mật khẩu không đúng! Vui lòng nhập lại." });
            }

            query.Token = CreateJwt(query);
            var newAccessToken = query.Token;
            var newRefreshToken = CreateRefreshToken();
            query.RefreshToken = newRefreshToken;
            query.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] KhachHang model)
        {
            if (model == null)
                return BadRequest();

            // check email
            if (await CheckEmailExistAsync(model.Email))
                return BadRequest(new { Message = "Email đã tồn tại!" });

            var passMessage = CheckPasswordStrength(model.PassWord);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new { message = passMessage.ToString() });

            model.PassWord = PasswordHasher.HashPassword(model.PassWord);

            await _context.AddAsync(model);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Status = 200,
                message = "Đăng ký thành công!"
            });
        }

        private Task<bool> CheckEmailExistAsync(string? email)
            => _context.KhachHangs.AnyAsync(x => x.Email == email);

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

        private string CreateJwt(KhachHang model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var identity = new ClaimsIdentity(new Claim[]
            {
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

            var tokenInUser = _context.KhachHangs
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
                throw new SecurityTokenException("Đây là mã thông báo không hợp lệ");
            return principal;

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
            var user = await _context.KhachHangs.FirstOrDefaultAsync(u => u.Email == email);
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
    }
}
