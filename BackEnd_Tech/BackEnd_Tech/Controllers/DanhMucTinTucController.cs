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

    public class DanhMucTinTucController : ControllerBase
    {
        private TechStoreContext _context;
        public DanhMucTinTucController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_DanhMucTinTuc")]
        [HttpGet]
        public async Task<IActionResult> GetAllDanhMucTinTuc()
        {
            try
            {
                var query = await _context.DanhMucTinTucs
                                          .Where(x => x.TrangThai == true)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              tenDanhMuc = x.TenDanhMuc
                                          }).ToListAsync();

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_DanhMucTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdDanhMucTinTuc(int id)
        {
            try
            {
                var query = await _context.DanhMucTinTucs.FindAsync(id);
                if(query == null)
                {
                    return BadRequest(new { message = "Danh mục tin tức không tồn tại!" });
                }
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_DanhMucTinTuc")]
        [HttpPost]
        public async Task<IActionResult> CreateDanhMucTinTuc([FromBody] DanhMucTinTuc model)
        {
            try
            {
                _context.DanhMucTinTucs.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Thêm danh mục tin tức thành công!" });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_DanhMucTinTuc")]
        [HttpPut]
        public async Task<IActionResult> UpdateDanhMucTinTuc([FromBody] DanhMucTinTuc model)
        {
            try
            {
                var query = await _context.DanhMucTinTucs.FindAsync(model.Id);

                if( query == null)
                {
                    return BadRequest(new { message = "Danh mục tin tức không tồn tại!" });
                }

                query.TenDanhMuc = model.TenDanhMuc;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập danh mục tin tức thành công!" });
            }catch (Exception ex)
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
                var query = await _context.DanhMucTinTucs.FindAsync(id);
                if (query == null)
                {
                    return BadRequest(new { message = "Danh mục tin tức không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                return Ok(new { message = "Cập nhập trạng thái danh mục tin tức thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_DanhMucTinTuc/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDanhMucTinTuc(int id)
        {
            try
            {
                var query = await _context.DanhMucTinTucs.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Danh mục tin tức không tồn tại!" });
                }

                _context.DanhMucTinTucs.Remove(query);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa danh mục tin tức thành công!" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }

        [Route("Search_DanhMucTinTuc")]
        [HttpGet]
        public async Task<IActionResult> SearchDanhMucTinTuc([FromQuery] string? tenDanhMuc, int page = 1, int pageSize = 10)
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

                var query = _context.DanhMucTinTucs.AsQueryable();

                if (!string.IsNullOrEmpty(tenDanhMuc))
                {
                    query = query.Where(l => l.TenDanhMuc.Contains(tenDanhMuc));
                }

                var totalItems = await query.CountAsync();

                var DanhMucTinTucList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = DanhMucTinTucList
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
