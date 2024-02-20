using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Dto;
using BackEnd_Tech.Models.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public async Task<IActionResult> Create([FromBody] account model)
        {
            var email = model.Email;
            var passWord = model.PassWord;
            var nhanvien = _context.NhanViens
                            .Where(x => x.Email == email)
                            .Select(x => new { x.PassWord, x.RoleId })
                            .FirstOrDefault();
            if (nhanvien == null)
            {
                return BadRequest(new { message = "Tài khoản không đúng! Vui lòng nhập lại" });
            }

            if (!PasswordHasher.VerifyPassword(passWord, nhanvien.PassWord))
            {
                return BadRequest("Mật khẩu không đúng! Vui lòng nhập lại"); // hoặc trả về một response thích hợp
            }

            var role = _context.Roles.FirstOrDefault(r => r.Id == nhanvien.RoleId);

            var result = new
            {
                email = email,
                tenRole = role.TenRole
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, result.email.ToString()),
                    new Claim(ClaimTypes.Role, result.tenRole)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var tmp = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(tmp);
            return Ok(new
            {
                AccessToken = token
            });
        }
    }
}
