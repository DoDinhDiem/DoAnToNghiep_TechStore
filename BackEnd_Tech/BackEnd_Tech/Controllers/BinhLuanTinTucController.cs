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
    public class BinhLuanTinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public BinhLuanTinTucController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetById_BinhLuanTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdBinhLuanTinTuc(int id)
        {
            try
            {
                var query = await _context.BinhLuanTinTucs
                                          .Where(x => x.Id == id)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              tenTinTuc = x.TinTuc.TieuDe,
                                              hoTen = x.HoTen,
                                              email = x.Email,
                                              noiDung = x.NoiDung,
                                              userComment = x.KhachHang.HoTen,
                                              avatar = x.KhachHang.Avatar,
                                              createdAt = x.CreatedAt,
                                              trangThai = x.TrangThai
                                          }).FirstOrDefaultAsync();

                if(query == null)
                {
                    return BadRequest(new { message = "Bình luận không tồn tại!" });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("Update_BinhLuanTinTuc")]
        [HttpPut]
        public async Task<IActionResult> UpdateBinhLuanTinTuc([FromBody] BinhLuanTinTuc model)
        {
            var query = await _context.BinhLuanTinTucs.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy bình luận  cần sửa" });
            }

            query.NoiDung = model.NoiDung;
            query.TrangThai = model.TrangThai;

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
                var query = await _context.BinhLuanTinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy bình luận cần sửa" });
                }
                query.TrangThai = !query.TrangThai;
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    message = "Cập nhập trạng thái thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_BinhLuanTinTuc/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteBinhLuanTinTuc(int id)
        {
            try
            {
                var query = await _context.BinhLuanTinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy bình luận cần sửa" });
                }

                _context.BinhLuanTinTucs.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa bình luận thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_BinhLuanTinTuc")]
        [HttpGet]
        public async Task<IActionResult> SearchBinhLuanTinTuc([FromQuery] int id, int page = 1, int pageSize = 10)
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

                var query = _context.BinhLuanTinTucs.Where(x=>x.TinTucId ==id).AsQueryable();

                var totalItems = await query.CountAsync();

                var BinhLuanTinTucList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(x => new
                                            {
                                                id = x.Id,
                                                tenTinTuc = x.TinTuc.TieuDe,
                                                hoTen = x.HoTen,
                                                email = x.Email,
                                                noiDung = x.NoiDung,
                                                userComment = x.KhachHang.HoTen,
                                                trangThai = x.TrangThai
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = BinhLuanTinTucList
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
