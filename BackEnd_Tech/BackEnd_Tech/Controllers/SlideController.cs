using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideController : ControllerBase
    {
        private TechStoreContext _context;
        public static IWebHostEnvironment _environment;
        public SlideController(TechStoreContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetById_Slide/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdSlide(int id)
        {
            try
            {
                var query = await _context.Slides.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new {message = "Slide không tồn tại!" });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Slide")]
        [HttpPost]
        public async Task<IActionResult> CreateSlide([FromBody] Slide model)
        {
            try
            {
                _context.Slides.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm slide thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Slide")]
        [HttpPut]
        public async Task<IActionResult> UpdateSlide([FromBody] Slide model)
        {
            var query = await _context.Slides.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy slide cần sửa" });
            }

            query.Image = model.Image;
            query.Link = model.Link;
            query.TrangThai = model.TrangThai;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhập slide thành công!"
            });
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.Slides.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy slide cần sửa" });
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

        [Route("Delete_Slide/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSlide(int id)
        {
            try
            {
                var query = await _context.Slides.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy slide cần sửa" });
                }

                _context.Slides.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa slide thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_Slide")]
        [HttpGet]
        public async Task<IActionResult> SearchSlide([FromQuery] int page = 1, int pageSize = 10)
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

                var query = _context.Slides.AsQueryable();

                var totalItems = await query.CountAsync();

                var slideList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = slideList
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
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "Slides");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string filePath = Path.Combine(uploadsFolder, file.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                return Ok(new{fileName = file.FileName});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
