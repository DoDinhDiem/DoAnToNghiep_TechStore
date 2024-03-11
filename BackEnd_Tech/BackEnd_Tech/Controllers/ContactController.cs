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

    public class ContactController : ControllerBase
    {
        private TechStoreMainContext _context;
        public ContactController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetById_Contact/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdContact(int id)
        {
            try
            {
                var query = await _context.Contacts.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Contact không tồn tại!" });
                }

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_Contact")]
        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] Contact model)
        {
            try
            {
                _context.Contacts.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm contact thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_Contact")]
        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] Contact model)
        {
            var query = await _context.Contacts.FindAsync(model.Id);

            if (query == null)
            {
                return BadRequest(new { message = "Không tìm thấy contact cần sửa" });
            }

            query.Map = model.Map;
            query.Duong = model.Duong;
            query.ThonXom = model.ThonXom;
            query.XaPhuong = model.XaPhuong;
            query.QuanHuyen = model.QuanHuyen;
            query.TinhThanhPho =model.TinhThanhPho;
            query.Email = model.Email;
            query.SoDienThoai = model.SoDienThoai;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhập contact thành công!"
            });
        }

        [Route("Delete_Contact/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var query = await _context.Contacts.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy contact" });
                }

                _context.Contacts.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa contact thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_Contact")]
        [HttpGet]
        public async Task<IActionResult> SearchContact([FromQuery] int page = 1, int pageSize = 10)
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

                var query = _context.Contacts.AsQueryable();

                var totalItems = await query.CountAsync();

                var contactList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = contactList
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
