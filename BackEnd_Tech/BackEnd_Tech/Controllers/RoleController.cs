using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private TechStoreContext _context;
        public RoleController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetAll_Role")]
        [HttpGet]
        public async Task<IActionResult> GetAllRole()
        {
            try
            {
                var query = await _context.Roles
                                          .Where(x => x.TrangThai == true)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              tenRole = x.TenRole
                                          }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_Role/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdRole(int id)
        {
            try
            {
                var query = await _context.Roles.FindAsync(id);

                if(query == null)
                {
                    return BadRequest(new { message = "Role không tồn tại!" });
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Role")]
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] Role model)
        {
            try
            {
                _context.Roles.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new {message = "Thêm role thành công!"});

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Role")]
        [HttpPut]
        public async Task<IActionResult> UpdateRole([FromBody] Role model)
        {
            try
            {
                var query = await _context.Roles.FindAsync(model.Id);

                if( query == null)
                {
                    return BadRequest(new { message = "Role không tồn tại!" });
                }

                query.TenRole = model.TenRole;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Sửa role thành công!" });
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
                var query = await _context.Roles.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Role không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập trạng thái role thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_Role/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRole(int id)
        {
            try
            {
                var query = await _context.Roles.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Role không tồn tại!" });
                }

                _context.Roles.Remove(query);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa role thành công!" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_Role")]
        [HttpGet]
        public async Task<IActionResult> SearchLoaiSanPham([FromQuery] string? tenRole, int page = 1, int pageSize = 10)
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

                var query = _context.Roles.AsQueryable();

                if (!string.IsNullOrEmpty(tenRole))
                {
                    query = query.Where(l => l.TenRole.Contains(tenRole));
                }

                var totalItems = await query.CountAsync();

                var roleList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = roleList
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
