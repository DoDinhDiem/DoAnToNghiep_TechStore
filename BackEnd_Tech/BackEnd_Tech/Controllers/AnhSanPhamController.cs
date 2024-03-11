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
    public class AnhSanPhamController : ControllerBase
    {
        private TechStoreMainContext _context;
        public static IWebHostEnvironment _environment;
        public AnhSanPhamController(TechStoreMainContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetById_AnhSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdAnhSanPham(int id)
        {
            try
            {
                var query = await _context.AnhSanPhams.FindAsync(id);
                if(query == null)
                {
                    return BadRequest(new { message = "Ảnh sản phẩm không tồn tại!" });
                }
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_AnhSanPham")]
        [HttpPost]
        public async Task<IActionResult> CreateAnhSanPham([FromBody] AnhSanPham model)
        {
            try
            {
                _context.AnhSanPhams.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm ảnh sản phẩm thành công" });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_AnhSanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateAnhSanPham([FromBody] AnhSanPham model)
        {
            try
            {
                var query = await _context.AnhSanPhams.FindAsync(model.Id);

                if (query == null)
                {
                    return BadRequest(new { message = "Ảnh sản phẩm không tồn tại" });
                }

                query.Image = model.Image;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Sửa ảnh sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public  async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.AnhSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Ảnh sản phẩm không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa ảnh sản phẩm thành công!" });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_AnhSanPham/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAnhSanPham(int id)
        {
            try
            {
                var query = await _context.AnhSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy ảnh sản phẩm cần sửa" });
                }

                _context.AnhSanPhams.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa ảnh sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_AnhSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> SearchAnhSanPham(int id, int page, int pageSize)
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

                var query = _context.AnhSanPhams.Where(a => a.SanPhamId == id);

                var totalItems = await query.CountAsync();

                var sanPhamList = await query.OrderByDescending(anh => anh.CreatedAt)
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(anh => new
                                            {
                                                anhSP = anh,
                                                tenSanPham = _context.SanPhams.Where(l => l.Id == anh.SanPhamId).Select(x => x.TenSanPham).FirstOrDefault()
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = sanPhamList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Upload_Image")]
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "Products");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string filePath = Path.Combine(uploadsFolder, file.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return Ok(new { fileName = file.FileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
