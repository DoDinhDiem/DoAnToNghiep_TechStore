using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Dto;
using BackEnd_Tech.Models.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private TechStoreContext _context;
        private AppSettings _appSettings;
        public LoginController(TechStoreContext context, IOptions<AppSettings> appSetting)
        {
            _context = context;
            _appSettings = appSetting.Value;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] NhanVien model)
        {
            if (model == null)
                return BadRequest();

            var user = await _context.NhanViens
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
                return NotFound(new { message = "Email không tồn tại! Vui lòng nhập lại." });

            if (!PasswordHasher.VerifyPassword(model.PassWord, user.PassWord))
            {
                return BadRequest(new { Message = "Mật khẩu không đúng! Vui lòng nhập lại." });
            }

            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(2);
            await _context.SaveChangesAsync();

            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        private string CreateJwt(NhanVien model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, model.Role.TenRole),
                new Claim(ClaimTypes.Email,model.Email)
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

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Yêu cầu không hợp lệ");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var email = principal.Identity.Name;
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
    }
}
