using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HangSanPhamController : ControllerBase
    {
        private TechStoreContext _context;

        public HangSanPhamController(TechStoreContext context)
        {
            _context = context;   
        }

        [Route("GetAll_HangSanPham")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HangSanPham>>> GetAllHangSanPham()
        {
            try
            {
                var query = await _context.HangSanPhams
                                          .Where(hang => hang.TrangThai == true)
                                          .Select(hang => new
                                          {
                                              id = hang.Id,
                                              tenHang = hang.TenHang
                                          }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetById_HangSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdHangSanPham(int id)
        {
            try
            {
                var query = await _context.HangSanPhams.FindAsync(id);

                if(query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy hãng sản phẩn!" });
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_HangSanPham")]
        [HttpPost]
        public async Task<IActionResult> CreateHangSanPham([FromBody] HangSanPham model)
        {
            try
            {
                _context.HangSanPhams.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new {message = "Thêm hãng sản phẩm thành công!"});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HangSanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateHangSanPham([FromBody] HangSanPham model)
        {
            try
            {
                var query = await _context.HangSanPhams.FindAsync(model.Id);

                if (query == null)
                {
                    return BadRequest(new {message = "Không tìm thấy hãng sản phẩm"});
                }

                query.TenHang = model.TenHang;
                query.TrangThai = model.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new {message = "Sửa hãng sản phẩm thành công!"});
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
                var query = await _context.HangSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy hãng sản phẩm" });
                }

                query.TrangThai = !query.TrangThai;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Sửa hãng sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_HangSanPham/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteHangSanPham(int id)
        {
            try
            {
                var query = await _context.HangSanPhams.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy hãng sản phẩm" });
                }

                _context.HangSanPhams.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa hãng sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_HangSanPham")]
        [HttpGet]
        public async Task<IActionResult> SearchHangSanPham([FromQuery] string? tenHang, int page = 1, int pageSize = 10)
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

                var query = _context.HangSanPhams.AsQueryable();

                if (!string.IsNullOrEmpty(tenHang))
                {
                    query = query.Where(l => l.TenHang.Contains(tenHang));
                }

                var totalItems = await query.CountAsync();

                var HangSanPhamList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = HangSanPhamList
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
