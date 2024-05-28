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
    public class HoaDonXuatController : ControllerBase
    {
        private TechStoreMainContext _context;
        public HoaDonXuatController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetById_HoaDonXuat/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdHoaDonXuat(int id)
        {
            try
            {
                var query = await _context.HoaDonXuats.Where(a => a.Id == id)
                                                       .Select(hd => new
                                                       {
                                                           hoaDons = hd,
                                                           chiTiet = _context.ChiTietHoaDonXuats
                                                                .Where(ct => ct.HoaDonXuatId == hd.Id)
                                                                .Select(a => new
                                                                {
                                                                    tenSP = _context.SanPhams.Where(sp => sp.Id == a.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
                                                                    soLuong = a.SoLuong,
                                                                    giaBan = a.GiaBan,
                                                                    thanhTien = a.ThanhTien
                                                                }).ToList()
                                                       }).FirstOrDefaultAsync();

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
        public async Task<IActionResult> SearchHoaDonXuat([FromQuery] int? trangThai, int page = 1, int pageSize = 10)
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


                if (trangThai.HasValue)
                {
                    switch (trangThai)
                    {
                        case 0:
                            query = query.Where(x => x.TrangThaiDonHang == 0);
                            break;
                        case 1:
                            query = query.Where(x => x.TrangThaiDonHang == 1);
                            break;
                        case 2:
                            query = query.Where(x => x.TrangThaiDonHang == 2);
                            break;
                        case 3:
                            query = query.Where(x => x.TrangThaiDonHang == 3);
                            break;
                        case 4:
                            query = query.Where(x => x.TrangThaiDonHang == 4);
                            break;
                        default:
                            break;
                    }
                }

                var totalItems = await query.CountAsync();

                var hoaDonList = await query.OrderByDescending(p => p.CreatedAt)
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
