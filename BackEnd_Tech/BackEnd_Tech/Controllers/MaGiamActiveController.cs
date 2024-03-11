using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin")]

    public class MaGiamActiveController : ControllerBase
    {
        private TechStoreMainContext _context;

        public MaGiamActiveController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("Search_MaGiamActive")]
        [HttpGet]
        public async Task<IActionResult> SearchLoaiSanPham([FromQuery] int id, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = _context.MaGiamActives.Where(x => x.MaGiamGiaId == id);

                var totalItems = await query.CountAsync();

                var MaGiamList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(x => new
                                            {
                                                MaGiamGia = x.MaGiamGia.MaGiamGia,
                                                KhachHang = x.KhachHang.HoTen,
                                                CreatedAt = x.CreatedAt,
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = MaGiamList
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
