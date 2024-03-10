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

    public class ThongSoController : ControllerBase
    {
        private TechStoreContext _context;
        public ThongSoController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetById_ThongSoSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdThongSoSanPham(int id)
        {
            try
            {
                var query = await _context.ThongSos.FindAsync(id);
                
                if(query == null)
                {
                    return BadRequest(new { message = "Thông số sản phẩm không tồn tại!" });
                }
                return Ok(query);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_ThongSoSanPham")]
        [HttpPost]
        public async Task<IActionResult> CreateThongSoSanPham([FromBody] ThongSo model)
        {
            try
            {
                _context.ThongSos.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new {message = "Thêm thông số sản phẩm thành công!"});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_ThongSoSanPham")]
        [HttpPut]
        public async Task<IActionResult> UpdateThongSoSanPham([FromBody] ThongSo model)
        {
            try
            {
                var query = await _context.ThongSos.FindAsync(model.Id);

                if( query == null)
                {
                    return BadRequest(new { message = "Thông số sản phẩm không tồn tại!" });
                }

                query.TenThongSo = model.TenThongSo;
                query.MoTa = model.MoTa;
                query.TrangThai = model.TrangThai;
                await _context.SaveChangesAsync();  

                return Ok(new { message = "Sửa thông số sản phẩm thành công!" });
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("TrangThai/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateThongSoSanPham(int id)
        {
            try
            {
                var query = await _context.ThongSos.FindAsync(id);

                if( query == null)
                {
                    return BadRequest(new { message = "Thông số sản phẩm không tồn tại!" });
                }

                query.TrangThai = !query.TrangThai;
                query.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Sửa trạng thái thông số sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Delete_ThongSoSanPham/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteThongSoSanPham(int id)
        {
            try
            {
                var query = await _context.ThongSos.FindAsync(id);

                if (query == null)
                {
                    return BadRequest(new { message = "Không tìm thấy thông số sản phẩm cần sửa" });
                }

                _context.ThongSos.Remove(query);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thông số sản phẩm thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_ThongSoSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> SearchLoaiSanPham(int id, string? tenThongSo, int page = 1, int pageSize = 10)
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

                var query = _context.ThongSos.Where(x => x.SanPhamId == id);

                if (!string.IsNullOrEmpty(tenThongSo))
                {
                    query = query.Where(l => l.TenThongSo.Contains(tenThongSo));
                }

                var totalItems = await query.CountAsync();

                var ThongSoSanPhamList = await query.OrderByDescending(anh => anh.CreatedAt)
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(ts => new
                                            {
                                                thongSo = ts,
                                                tenSanPham = _context.SanPhams.Where(l => l.Id == ts.SanPhamId).Select(x => x.TenSanPham).FirstOrDefault()
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = ThongSoSanPhamList
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
