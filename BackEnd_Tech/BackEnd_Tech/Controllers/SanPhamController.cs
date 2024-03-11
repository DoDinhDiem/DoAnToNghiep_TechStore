using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin, Role_User")]
    public class SanPhamController : ControllerBase
    {
        private TechStoreMainContext _context;
        public static IWebHostEnvironment _environment;
        public SanPhamController(TechStoreMainContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [Route("GetAll_SanPham")]
        [HttpGet]
        public async Task<IActionResult> GetAllSanPham()
        {
            try
            {
                var query = await _context.SanPhams
                                    .Where(sp => sp.TrangThai == true)
                                    .Select(sp => new
                                    {
                                        id = sp.Id,
                                        tenSanPham = sp.TenSanPham
                                    }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_SanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdSanPham(int id)
        {
            try
            {
                var query = await _context.SanPhams
                                          .Where(s => s.Id == id)
                                          .Select(s => new
                                          {
                                              SanPham = s,
                                              Image = _context.AnhSanPhams
                                                                    .Where(a => a.SanPhamId == s.Id && a.TrangThai == true)
                                                                    .Select(a => a.Image )
                                                                    .FirstOrDefault(),
                                              AnhSanPhams = _context.AnhSanPhams
                                                                    .Where(a => a.SanPhamId == s.Id && a.TrangThai == false)
                                                                    .Select(a => new { Image = a.Image } )
                                                                    .ToList(),
                                              ListImage = _context.AnhSanPhams
                                                                .Where(a => a.SanPhamId == s.Id)
                                                                .Select(a => new { a.Image })
                                                                .ToList(),
                                              ThongSos = _context.ThongSos
                                                             .Where(t => t.SanPhamId == s.Id)
                                                             .Select(t => new { t.TenThongSo, t.MoTa })
                                                             .ToList()
                                          })
                                          .FirstOrDefaultAsync();

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy sản phẩm cần tìm!" });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("Create_SanPham")]
        [HttpPost]
        public async Task<IActionResult> CreateSanPham([FromBody] SanPham model)
        {
            try
            {
                model.SoLuongTon = 0;
                _context.SanPhams.Add(model);


                var images = new List<AnhSanPham>();
                foreach (var imgs in model.AnhSanPhams)
                {
                    var img = new AnhSanPham
                    {
                        SanPhamId = model.Id,
                        Image = imgs.Image,
                        TrangThai = imgs.TrangThai
                    };
                    images.Add(img);
                }

                var parameters = new List<ThongSo>();
                foreach (var parameter in model.ThongSos)
                {
                    var par = new ThongSo
                    {
                        SanPhamId = model.Id,
                        TenThongSo = parameter.TenThongSo,
                        MoTa = parameter.MoTa,
                        TrangThai = true
                    };
                    parameters.Add(par);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Thêm sản phẩm thành công" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_SanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateSanPham([FromBody] SanPham model)
        {
            try
            {
                var query = await _context.SanPhams.FindAsync(model.Id);

                if(query == null)
                {
                    return BadRequest(new { message = "Sản phẩm không tồn tại!" });
                }

                query.TenSanPham = model.TenSanPham;
                query.GiaBan = model.GiaBan;
                query.BaoHang = model.BaoHang;
                query.MoTa = model.MoTa;
                query.LoaiSanPham = model.LoaiSanPham;
                query.HangSanPham = model.HangSanPham;
                query.TrangThai = model.TrangThai;

           
                _context.AnhSanPhams.RemoveRange(_context.AnhSanPhams.Where(img => img.SanPhamId == model.Id));

                foreach(var image in model.AnhSanPhams)
                {
                    var img = new AnhSanPham
                    {
                        SanPhamId = model.Id,
                        Image = image.Image,
                        TrangThai = image.TrangThai
                    };
                    query.AnhSanPhams.Add(img);
                }

                _context.ThongSos.RemoveRange(_context.ThongSos.Where(t => t.SanPhamId == model.Id));

                foreach (var parameter in model.ThongSos)
                {
                    var parr = new ThongSo
                    {
                        SanPhamId = model.Id,
                        TenThongSo = parameter.TenThongSo,
                        MoTa = parameter.MoTa,
                        TrangThai = true
                    };
                    query.ThongSos.Add(parameter);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật sản phẩm thành công!" });

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
                var query = await _context.SanPhams.FindAsync(id);

                if(query == null)
                {
                    return BadRequest(new { message = "Sản phẩm không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập trạng thái thành công!" });

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_SanPham/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSanPham(int id)
        {
            try
            {
                var query = await _context.SanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Sản phẩm không tồn tại!" });
                }

                _context.SanPhams.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa sản phẩm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_SanPham")]
        [HttpGet]
        public async Task<IActionResult> SearchSanPham([FromQuery] string? tenSanPham, decimal? giaBanMin, decimal? giaBanMax, int page = 1, int pageSize = 10)
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

                var query = _context.SanPhams.AsQueryable();

                if (!string.IsNullOrEmpty(tenSanPham))
                {
                    query = query.Where(l => l.TenSanPham.Contains(tenSanPham));
                }

                if (giaBanMin != null && giaBanMax != null)
                {
                    query = query.Where(l => l.GiaBan >= giaBanMin && l.GiaBan <= giaBanMax);
                }

                var totalItems = await query.CountAsync();

                var SanPhamList = await query.OrderByDescending(x => x.CreatedAt)
                                        .Skip((page - 1) * pageSize)
                                        .Take(pageSize)
                                        .Select(sp => new
                                        {
                                            id = sp.Id,
                                            tenSanPham =  sp.TenSanPham,
                                            giaBan = sp.GiaBan,
                                            giamGia = sp.GiamGia,
                                            soLuongTon = sp.SoLuongTon,
                                            baoHang = sp.BaoHang,
                                            moTa = sp.MoTa,
                                            trangThai = sp.TrangThai,
                                            createdAt = sp.CreatedAt,
                                            updatedAt = sp.UpdatedAt,
                                            anhSanPham = _context.AnhSanPhams.Where(a => a.SanPhamId == sp.Id && a.TrangThai == true).Select(a => a.Image).FirstOrDefault(),
                                            tenLoai = _context.LoaiSanPhams.Where(l => l.Id == sp.LoaiSanPhamId).Select(x => x.TenLoai).FirstOrDefault(),
                                            tenHang = _context.HangSanPhams.Where(h => h.Id == sp.HangSanPhamId).Select(x => x.TenHang).FirstOrDefault()
                                        })
                                        .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = SanPhamList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Thêm nhiều ảnh
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

                    fileNames.Add(file.FileName);
                }

                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //Thêm một ảnh
        [Route("Upload_Image_One")]
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
