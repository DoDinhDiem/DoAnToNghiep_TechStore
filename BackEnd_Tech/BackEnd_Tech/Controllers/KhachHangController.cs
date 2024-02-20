using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private TechStoreContext _context;
        public KhachHangController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetById_KhachHang/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdKhachHang(int id)
        {
            try
            {
                var query = await _context.KhachHangs.FindAsync(id);
                if (query == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại!" });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_KhachHang")]
        [HttpPost]
        public async Task<IActionResult> CreateKhachHang([FromBody] KhachHang model)
        {
            try
            {
                _context.KhachHangs.Add(model);

                var ViTechStore = new ViTechStore();
                ViTechStore.UserId = model.Id;
                ViTechStore.SoTien = 0;
                ViTechStore.TrangThai = true;
                _context.ViTechStores.Add(ViTechStore);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Thêm khách hàng thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_KhachHang")]
        [HttpPut]
        public async Task<IActionResult> UpdateKhachHang([FromBody] KhachHang model)
        {
            try
            {
                var query = await _context.KhachHangs.FindAsync(model.Id);
                if (query == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại!" });
                }

                query.HoTen = model.HoTen;
                query.SoDienThoai = model.SoDienThoai;
                query.DiaChi = model.DiaChi;
                query.GioiTinh = model.GioiTinh;
                query.NgaySinh = model.NgaySinh;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập thông tin khách hàng thành công" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
