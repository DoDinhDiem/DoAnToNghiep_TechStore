using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Role_Admin")]

    public class ChucVuController : ControllerBase
    {
        private TechStoreMainContext _context;
        public ChucVuController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetAll_ChucVu")]
        [HttpGet]
        public async Task<IActionResult> GetAllChucVu()
        {
            try
            {
                var query = await _context.ChucVus
                                          .Where(x => x.TrangThai == true)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              tenChucVu = x.TenChucVu
                                          }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_ChucVu/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdChucVu(int id)
        {
            try
            {
                var query = await _context.ChucVus.FindAsync(id);

                if(query == null)
                {
                    return BadRequest(new { message = "Chức vụ không tồn tại!" });
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_ChucVu")]
        [HttpPost]
        public async Task<IActionResult> CreateChucVu([FromBody] ChucVu model)
        {
            try
            {
                _context.ChucVus.Add(model);
                await _context.SaveChangesAsync(); 
                return Ok(new {message = "Thêm chức vụ thành công!"});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_ChucVu")]
        [HttpPut]
        public async Task<IActionResult> UpdadteChucVu([FromBody] ChucVu model)
        {
            try
            {
                var query = await _context.ChucVus.FindAsync(model.Id);
                
                if( query == null)
                {
                    return BadRequest(new { message = "Chức vụ không tồn tại!" });
                }

                query.TenChucVu = model.TenChucVu;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new {message = "Sửa chức vụ thành công"});
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
                var query = await _context.ChucVus.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Chức vụ không tồn tại!" });
                }

                query.TrangThai =!query.TrangThai;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập trạng thái chức vụ thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_ChucVu/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteChucVu(int id)
        {
            try
            {
                var query = await _context.ChucVus.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Chức vụ không tồn tại!" });
                }
                _context.ChucVus.Remove(query);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa chức vụ thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_ChucVu")]
        [HttpGet]
        public async Task<IActionResult> SearchChucVu([FromQuery] string? tenChucVu, int page = 1, int pageSize = 10)
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

                var query = _context.ChucVus.AsQueryable();

                if (!string.IsNullOrEmpty(tenChucVu))
                {
                    query = query.Where(l => l.TenChucVu.Contains(tenChucVu));
                }

                var totalItems = await query.CountAsync();

                var ChucVuList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = ChucVuList
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
