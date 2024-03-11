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
    public class AboutController : ControllerBase
    {
        private TechStoreMainContext _context;
        public AboutController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetById_About/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdAbout(int id)
        {
            try
            {
                var query = await _context.Abouts.FindAsync(id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_About")]
        [HttpPost]
        public async Task<IActionResult> CreateAbout([FromBody] About model)
        {
            try
            {
                _context.Abouts.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm thông tin cửa hàng thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_About")]
        [HttpPut]
        public async Task<IActionResult> UpdateAbout([FromBody] About model)
        {
            var query = await _context.Abouts.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy thông tin cần sửa" });
            }

            query.GioiThieu = model.GioiThieu;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhập thông tin thành công!"
            });
        }

        [Route("Delete_About/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAbout(int id)
        {
            try
            {
                var query = await _context.Abouts.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy thông tin cần sửa" });
                }

                _context.Abouts.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thông tin thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_About")]
        [HttpGet]
        public async Task<IActionResult> SearchAbout([FromQuery] int page = 1, int pageSize = 10)
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

                var query = _context.Abouts.AsQueryable();

                var totalItems = await query.CountAsync();

                var aboutList = await query.Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = aboutList
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
