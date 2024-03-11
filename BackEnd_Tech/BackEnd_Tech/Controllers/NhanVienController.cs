using BackEnd_Tech.Models;
using BackEnd_Tech.Models.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class NhanVienController : ControllerBase
    {
        private TechStoreMainContext _context;
        public static IWebHostEnvironment _environment;
        public NhanVienController(TechStoreMainContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        [Authorize(Roles = "Role_Admin")]
        [Route("GetById_NhanVien/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdNhanVien(int id)
        {
            try
            {
                var query = await _context.NhanViens.FindAsync(id);
                if(query == null)
                {
                    return BadRequest(new { message = "Nhân viên không tồn tại!" });
                }
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Role_Admin, Role_User")]
        [Route("GetByEmail_NhanVien/{email}")]
        [HttpGet]
        public async Task<IActionResult> GetByEmailNhanVien(string email)
        {
            try
            {
                var query = await _context.NhanViens.Where(x => x.Email == email).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new { message = "Nhân viên không tồn tại!" });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "Role_Admin")]
        [Route("Create_NhanVien")]
        [HttpPost]
        public async Task<IActionResult> CreateNhanVien([FromBody] NhanVien model)
        {
            try
            {
                model.PassTrue = false;
                model.PassWord = PasswordHasher.HashPassword(model.PassWord);
                _context.NhanViens.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new {message = "Thêm nhân viên thành công!"});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "Role_Admin")]
        [Route("Update_NhanVien")]
        [HttpPut]
        public async Task<IActionResult> UpdateNhanVien([FromBody] NhanVien model)
        {
            try
            {
                var query = await _context.NhanViens.FindAsync(model.Id);
                if(query == null)
                {
                    return BadRequest(new { message = "Nhân viên không tồn tại!" });
                }

                query.RoleId = model.RoleId;
                query.Avatar = model.Avatar;
                query.HoTen = model.HoTen;
                query.SoDienThoai = model.SoDienThoai;
                query.DiaChi = model.DiaChi;
                query.GioiTinh = model.GioiTinh;
                query.NgaySinh = model.NgaySinh;
                query.NgayVaoLam = model.NgayVaoLam;
                query.ChucVuId = model.ChucVuId;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập thông tin nhân viên thành công" });

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "Role_Admin")]
        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrangThai(int id)
        {
            try
            {
                var query = await _context.NhanViens.FindAsync(id);
                if (query == null)
                {
                    return BadRequest(new { message = "Nhân viên không tồn tại!" });
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
        [Authorize(Roles = "Role_Admin")]
        [Route("Search_NhanVien")]
        [HttpGet]
        public async Task<IActionResult> SearchNhanVien([FromQuery] string? hoTen, string? email, int page = 1, int pageSize = 10)
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

                var query = _context.NhanViens.AsQueryable();

                if (!string.IsNullOrEmpty(hoTen))
                {
                    query = query.Where(l => l.HoTen.Contains(hoTen));
                }

                if (!string.IsNullOrEmpty(email))
                {
                    query = query.Where(l => l.Email.Contains(email));
                }

                var totalItems = await query.CountAsync();

                var NhanVienList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(nv => new
                                            {
                                                id = nv.Id,
                                                avatar = nv.Avatar,
                                                hoTen = nv.HoTen,
                                                email = nv.Email,
                                                soDienThoai = nv.SoDienThoai,
                                                diaChi= nv.DiaChi,
                                                gioiTinh = nv.GioiTinh,
                                                ngaySinh = nv.NgaySinh,
                                                ngayVaoLam = nv.NgayVaoLam,
                                                trangThai = nv.TrangThai,
                                                createdAt = nv.CreatedAt,
                                                updatedAt = nv.UpdatedAt,
                                                tenQuyen = _context.Roles.Where(role => role.Id == nv.RoleId).Select(x => x.TenRole).FirstOrDefault(),
                                                tenChucVu = _context.ChucVus.Where(cv => cv.Id == nv.ChucVuId).Select(x => x.TenChucVu).FirstOrDefault(),
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = NhanVienList
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
                string uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads", "Staffs");
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
