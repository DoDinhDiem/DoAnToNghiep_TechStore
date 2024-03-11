using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin, Role_User")]
    public class LoaiSanPhamController : ControllerBase
    {
        private TechStoreMainContext _context;
        public LoaiSanPhamController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetAll_LoaiSanPham")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoaiSanPham>>> GetAllLoaiSanPham()
        {
            try
            {
                var query = await _context.LoaiSanPhams
                                    .Where(loai => loai.TrangThai == true)
                                    .Select(loai => new
                                    {
                                        id = loai.Id,
                                        tenLoai = loai.TenLoai
                                    }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_LoaiSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdLoaiSanPham(int id)
        {
            try
            {
                var query = await _context.LoaiSanPhams
                                   .Where(loai => loai.Id == id)
                                   .Select(loai => new
                                   {
                                       id = loai.Id,
                                       tenLoai = loai.TenLoai,
                                       trangThai = loai.TrangThai
                                   }).FirstOrDefaultAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_LoaiSanPham")]
        [HttpPost]
        public async Task<IActionResult> CreateLoaiSanPham([FromBody] LoaiSanPham model)
        {
            try
            {
                _context.LoaiSanPhams.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm loại sản phẩm thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_LoaiSanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateLoaiSanPham([FromBody] LoaiSanPham model)
        {
            var query = await _context.LoaiSanPhams.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy loại sản phẩm cần sửa" });
            }

            query.TenLoai = model.TenLoai;
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
                var query = await _context.LoaiSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy loại sản phẩm cần sửa" });
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


        [Route("Delete_LoaiSanPham/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLoaiSanPham(int id)
        {
            try
            {
                var query = await _context.LoaiSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy loại sản phẩm cần sửa" });
                }

                _context.LoaiSanPhams.Remove(query);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa loại sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_LoaiSanPham")]
        [HttpGet]
        public async Task<IActionResult> SearchLoaiSanPham([FromQuery] string? tenLoai, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = _context.LoaiSanPhams.AsQueryable();

                if (!string.IsNullOrEmpty(tenLoai))
                {
                    query = query.Where(l => l.TenLoai.Contains(tenLoai));
                }

                var totalItems = await query.CountAsync();

                var LoaiSanPhamList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = LoaiSanPhamList
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
