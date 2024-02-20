using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnhTinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public static IWebHostEnvironment _environment;
        public AnhTinTucController(TechStoreContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetById_AnhTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdAnhTinTuc(int id)
        {
            try
            {
                var query = await _context.AnhTinTucs.FindAsync(id);
                if (query == null)
                {
                    return BadRequest(new { message = "Ảnh tin tức không tồn tại!" });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_AnhTinTuc")]
        [HttpPost]
        public async Task<IActionResult> CreateAnhTinTuc([FromBody] AnhTinTuc model)
        {
            try
            {
                _context.AnhTinTucs.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm ảnh tin tức thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_AnhTinTuc")]
        [HttpPut]
        public async Task<IActionResult> UpdateAnhTinTuc([FromBody] AnhTinTuc model)
        {
            try
            {
                var query = await _context.AnhTinTucs.FindAsync(model.Id);

                if (query == null)
                {
                    return BadRequest(new { message = "Ảnh tin tức không tồn tại" });
                }

                query.Image = model.Image;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Sửa ảnh tin tức thành công!" });
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
                var query = await _context.AnhTinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Ảnh tin tức không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa ảnh tin tức thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_AnhTinTuc/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAnhTinTuc(int id)
        {
            try
            {
                var query = await _context.AnhTinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy ảnh tin tức cần sửa" });
                }

                _context.AnhTinTucs.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa ảnh tin tức thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_AnhTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> SearchAnhTinTuc(int id, int page, int pageSize)
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

                var query = _context.AnhTinTucs.Where(a => a.TinTucId == id);

                var totalItems = await query.CountAsync();

                var sanPhamList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                             .Select(anh => new
                                             {
                                                 anhTT = anh,
                                                 tieuDe = _context.TinTucs.Where(l => l.Id == anh.TinTucId).Select(x => x.TieuDe).FirstOrDefault()
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
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "News");
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
