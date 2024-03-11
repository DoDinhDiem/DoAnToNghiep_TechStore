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
    public class MaGiamGiaController : ControllerBase
    {
        private TechStoreMainContext _context;
        public MaGiamGiaController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetById_MaGiamGia/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdMaGiamGia(int id)
        {
            try
            {
                var query = await _context.MaGiamGia.FindAsync(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_MaGiamGia")]
        [HttpPost]
        public async Task<IActionResult> CreateMaGiamGia([FromBody] MaGiamGium model)
        {
            try
            {
                _context.MaGiamGia.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm mã giảm giá thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_MaGiamGia")]
        [HttpPut]
        public async Task<IActionResult> UpdateMaGiamGia([FromBody] MaGiamGium model)
        {
            var query = await _context.MaGiamGia.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy mã giảm giá cần sửa" });
            }

            query.MaGiamGia = model.MaGiamGia;
            query.SoTienGiam = model.SoTienGiam;
            query.TrangThai = model.TrangThai;
            query.SoLuong = model.SoLuong;
            query.HanSuDung = model.HanSuDung;
            query.MoTa = model.MoTa;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sửa loại sản phẩm thành công!"
            });
        }
        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.MaGiamGia.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy mã giảm giá cần sửa" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Cập nhật trạng thái thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("Delete_MaGiamGia/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLoaiSanPham(int id)
        {
            try
            {
                var query = await _context.MaGiamGia.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy loại sản phẩm cần sửa" });
                }

                _context.MaGiamGia.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa loại sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_MaGiamGia")]
        [HttpGet]
        public async Task<IActionResult> SearchLoaiSanPham([FromQuery] string? maGiamGia, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = _context.MaGiamGia.AsQueryable();

                if (!string.IsNullOrEmpty(maGiamGia))
                {
                    query = query.Where(l => l.MaGiamGia.Contains(maGiamGia));
                }

                var totalItems = await query.CountAsync();

                var MaGiamGiaList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = MaGiamGiaList
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
