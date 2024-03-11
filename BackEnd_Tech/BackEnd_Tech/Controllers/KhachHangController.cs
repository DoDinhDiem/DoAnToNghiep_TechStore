using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin, Role_User")]
    public class KhachHangController : ControllerBase
    {
        private TechStoreMainContext _context;
        public KhachHangController(TechStoreMainContext context)
        {
            _context = context;
        }


        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.KhachHangs.FindAsync(id);
                if (query == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Cập nhập trạng thái thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_KhachHang")]
        [HttpGet]
        public async Task<IActionResult> SearchKhachHang([FromQuery] string? hoTen, string? email, int page = 1, int pageSize = 10)
        {
            try
            {
                if (page < 1)
                {
                    page = 1;
                }

                if (pageSize < 1)
                {
                    pageSize = 10;
                }

                var query = _context.KhachHangs.AsQueryable();

                if (!string.IsNullOrEmpty(hoTen))
                {
                    query = query.Where(l => l.HoTen.Contains(hoTen));
                }

                if (!string.IsNullOrEmpty(email))
                {
                    query = query.Where(l => l.Email.Contains(email));
                }

                var totalItems = await query.CountAsync();

                var KhachHangList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = KhachHangList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
