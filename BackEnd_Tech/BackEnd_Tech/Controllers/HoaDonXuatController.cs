using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonXuatController : ControllerBase
    {
        private TechStoreContext _context;
        public HoaDonXuatController(TechStoreContext context)
        {
            _context = context;
        }

        [Route("GetById_HoaDonXuat/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdHoaDonXuat(int id)
        {
            try
            {
                var query = await _context.HoaDonXuats.FindAsync(id);

                if(query == null)
                {
                    return BadRequest(new {message = "Hóa đơn xuất không tồn tại!"});
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_HoaDonXuat")]
        [HttpPost]
        public async Task<IActionResult> CreateHoaDonXuat([FromBody] HoaDonXuat model)
        {
            try
            {
                _context.HoaDonXuats.Add(model);

                foreach(var invoice in _context.ChiTietHoaDonXuats)
                {
                    var ct = new ChiTietHoaDonXuat
                    {
                        HoaDonXuatId = model.Id,
                        SanPhamId = invoice.SanPhamId,
                        SoLuong = invoice.SoLuong,
                        GiaBan = invoice.GiaBan,
                        ThanhTien = invoice.ThanhTien
                    };

                    _context.ChiTietHoaDonXuats.Add(ct);
                }

                decimal? totalAmount = _context.ChiTietHoaDonXuats.Sum(ct => ct.ThanhTien);
                decimal? giamGia = model.GiamGia ?? 0;
                model.TongTien = totalAmount - giamGia;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Đặt hàng thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HoaDonXuat")]
        [HttpPut]
        public async Task<IActionResult> UpdateHoaDonXuat([FromBody] HoaDonXuat model)
        {
            try
            {
                var query = await _context.HoaDonXuats.FindAsync(model.Id);

                if(query == null)
                {
                    return BadRequest(new { message = "Hóa đơn không tồn tại!" });
                }

                query.TrangThaiDonHang = model.TrangThaiDonHang;
                query.TrangThaiThanhToan = model.TrangThaiThanhToan;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập hóa đơn thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_HoaDonXuat")]
        [HttpGet]
        public async Task<IActionResult> SearchHoaDonXuat([FromQuery] DateTime? createdAt, int page = 1, int pageSize = 10)
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

                var query = _context.HoaDonXuats.AsQueryable();

                if (createdAt.HasValue)
                {
                    query = query.Where(hd => hd.CreatedAt <= createdAt.Value.Date);
                }

                var totalItems = await query.CountAsync();

                var hoaDonList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = hoaDonList
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
