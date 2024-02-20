using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public static IWebHostEnvironment _environment;
        public TinTucController(TechStoreContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetById_TinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdTinTuc(int id)
        {
            try
            {
                var query = await _context.TinTucs
                                          .Where(s => s.Id == id)
                                          .Select(s => new
                                          {
                                              TinTuc = s,
                                              Image = _context.AnhTinTucs
                                                                    .Where(a => a.TinTucId == s.Id && a.TrangThai == true)
                                                                    .Select(a => new { a.Image })
                                                                    .FirstOrDefault(),
                                              AnhTinTuc = _context.AnhTinTucs
                                                                    .Where(a => a.TinTucId == s.Id && a.TrangThai == false)
                                                                    .Select(a => new { a.Image })
                                                                    .ToList(),
                                              tenNguoiViet = _context.NhanViens.Where(us => us.Id == s.UserId).Select(a => a.HoTen).FirstOrDefault()
                                          })
                                          .FirstOrDefaultAsync();

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy tin tức cần tìm!" });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_TinTuc")]
        [HttpPost]
        public async Task<IActionResult> CreateTinTuc([FromBody] TinTuc model)
        {
            try
            {
                _context.TinTucs.Add(model);

                var images = new List<AnhTinTuc>();
                foreach (var imgs in model.AnhTinTucs)
                {
                    var img = new AnhTinTuc
                    {
                        TinTucId = model.Id,
                        Image = imgs.Image,
                        TrangThai = imgs.TrangThai
                    };
                    images.Add(img);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Thêm tin tức thành công" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_TinTuc")]
        [HttpPut]
        public async Task<IActionResult> UpdateTinTuc([FromBody] TinTuc model)
        {
            try
            {
                var query = await _context.TinTucs.FindAsync(model.Id);

                if (query == null)
                {
                    return BadRequest(new { message = "Tin tức không tồn tại!" });
                }

                query.DanhMucId = model.DanhMucId;
                query.TieuDe = model.TieuDe;
                query.NoiDung = model.NoiDung;
                query.TrangThai = model.TrangThai;

                _context.AnhTinTucs.RemoveRange(_context.AnhTinTucs.Where(img => img.TinTucId == model.Id));

                foreach (var image in model.AnhTinTucs)
                {
                    var img = new AnhTinTuc
                    {
                        Image = image.Image,
                        TrangThai = image.TrangThai
                    };
                    query.AnhTinTucs.Add(img);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật tin tức thành công!" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai([FromQuery] int id)
        {
            try
            {
                var query = await _context.TinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Tin tức không tồn tại!" });
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

        [Route("Delete_TinTuc")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTinTuc([FromQuery] int id)
        {
            try
            {
                var query = await _context.TinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Tin tức không tồn tại!" });
                }

                _context.TinTucs.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa tin tức thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_TinTuc")]
        [HttpGet]
        public async Task<IActionResult> SearchTinTuc([FromQuery] string? tieuDe, int page = 1, int pageSize = 10)
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

                var query = _context.TinTucs.AsQueryable();

                if (!string.IsNullOrEmpty(tieuDe))
                {
                    query = query.Where(l => l.TieuDe.Contains(tieuDe));
                }

                var totalItems = await query.CountAsync();

                var TinTucList = await query.OrderByDescending(x => x.CreatedAt)
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(tt => new
                                            {
                                                tinTuc = tt,
                                                tenNguoiViet = _context.NhanViens.Where(us => us.Id == tt.UserId).Select(a => a.HoTen).FirstOrDefault(),
                                                tenDanhMuc = _context.DanhMucTinTucs.Where(dm => dm.Id == tt.DanhMucId).Select(a => a.TenDanhMuc).FirstOrDefault(),
                                                anhTinTuc = _context.AnhTinTucs.Where(anh => anh.TinTucId == tt.Id && anh.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = TinTucList
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
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            try
            {
                List<string> fileNames = new List<string>();

                foreach (var file in files)
                {
                    if (file == null || file.Length == 0)
                    {
                        continue;
                    }

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

                    fileNames.Add(file.FileName);
                }

                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
