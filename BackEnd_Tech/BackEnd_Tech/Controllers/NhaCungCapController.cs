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
    public class NhaCungCapController : ControllerBase
    {
        private TechStoreMainContext _context;
        public NhaCungCapController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("Getall_NhaCungCap")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhaCungCap>>> GetAllNhaCungCap()
        {
            try
            {
                var query = await _context.NhaCungCaps
                                    .Where(x => x.TrangThai == true)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenNhaCC = x.TenNhaCC
                                    }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_NhaCungCap/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdNhaCungCap(int id)
        {
            try
            {
                var query = await _context.NhaCungCaps
                                   .Where(x => x.Id == id)
                                   .Select(x => new
                                   {
                                       id = x.Id,
                                       tenNhaCC = x.TenNhaCC,
                                       email = x.Email,
                                       soDienThoai = x.SoDienThoai,
                                       diaChi = x.DiaChi,
                                       trangThai = x.TrangThai
                                   }).FirstOrDefaultAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_NhaCungCap")]
        [HttpPost]
        public async Task<IActionResult> CreateNhaCungCap([FromBody] NhaCungCap model)
        {
            try
            {
                _context.NhaCungCaps.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm nhà cung cấp thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_NhaCungCap")]
        [HttpPut]
        public async Task<IActionResult> UpdateNhaCungCap([FromBody] NhaCungCap model)
        {
            var query = await _context.NhaCungCaps.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy nhà cung cấp cần sửa" });
            }

            query.TenNhaCC = model.TenNhaCC;
            query.Email = model.Email;
            query.SoDienThoai = model.SoDienThoai;
            query.DiaChi = model.DiaChi;
            query.TrangThai = model.TrangThai;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sửa nhà cung cấp thành công!"
            });
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.NhaCungCaps.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy nhà cung cấp cần sửa" });
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

        [Route("Delete_NhaCungCap/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteNhaCungCap(int id)
        {
            try
            {
                var query = await _context.NhaCungCaps.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy nhà cung cấp cần sửa" });
                }

                _context.NhaCungCaps.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa nhà cung cấp thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_NhaCungCap")]
        [HttpGet]
        public async Task<IActionResult> SearchNhaCungCap([FromQuery] string? tenNhaCC, int page = 1, int pageSize = 10)
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

                var query = _context.NhaCungCaps.AsQueryable();

                if (!string.IsNullOrEmpty(tenNhaCC))
                {
                    query = query.Where(l => l.TenNhaCC.Contains(tenNhaCC));
                }

                var totalItems = await query.CountAsync();

                var NhaCungCapList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = NhaCungCapList
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
