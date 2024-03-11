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
    public class HoaDonNhapController : ControllerBase
    {
        private TechStoreMainContext _context;
        public HoaDonNhapController(TechStoreMainContext context)
        {
            _context = context;
        }

        [Route("GetById_HoaDonNhap/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdHoaDonNhap(int id)
        {
            try
            {
                var query = await _context.HoaDonNhaps
                                          .Where(x => x.Id == id)
                                          .Select(hd => new
                                          {
                                              hoaDon = hd,
                                              chiTiet = _context.ChiTietHoaDonNhaps
                                                                .Where(ct => ct.HoaDonNhapId == hd.Id)
                                                                .Select(a => new
                                                                {
                                                                    tenSP = _context.SanPhams.Where(sp => sp.Id == a.SanPhamId).Select(sp =>sp.TenSanPham ).FirstOrDefault(),
                                                                    hangSP = _context.SanPhams
                                                                                    .Where(sp => sp.Id == a.SanPhamId)
                                                                                    .Join(_context.HangSanPhams,
                                                                                      sanPham => sanPham.HangSanPhamId,
                                                                                      hangSanPham => hangSanPham.Id,
                                                                                      (sanPham, hangSanPham) => new
                                                                                      {
                                                                                          hangSanPham.TenHang
                                                                                      }).FirstOrDefault(),
                                                                    soLuong = a.SoLuong,
                                                                    giaNhap = a.GiaNhap,
                                                                    thanhTien = a.ThanhTien
                                                                }).ToList(),
                                              nhaCC = _context.NhaCungCaps
                                                                .Where(ncc => ncc.Id == hd.NhaCungCapId)
                                                                .Select(ncc => new
                                                                {
                                                                    tenNhaCC = ncc.TenNhaCC,
                                                                    email = ncc.Email,
                                                                    soDienThoai = ncc.SoDienThoai,
                                                                    diaChi = ncc.DiaChi
                                                                }).FirstOrDefault()

                                          }).FirstOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new { message = "Hóa đơn nhập không tồn tại" });
                }

                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_HoaDonNhap")]
        [HttpPost]
        public async Task<IActionResult> CreateHoaDonNhap([FromBody] HoaDonNhap model)
        {
            try
            {
                _context.HoaDonNhaps.Add(model);

                var newHoaDon = new List<ChiTietHoaDonNhap>();
                foreach (var invoice in model.ChiTietHoaDonNhaps)
                {
                    var ct = new ChiTietHoaDonNhap()
                    {
                        HoaDonNhapId = model.Id,
                        SanPhamId = invoice.SanPhamId,
                        SoLuong = invoice.SoLuong,
                        GiaNhap = invoice.GiaNhap,
                        ThanhTien = invoice.ThanhTien
                    };

                    var SanPham = await _context.SanPhams.FindAsync(ct.SanPhamId);

                    if(SanPham != null)
                    {
                        SanPham.SoLuongTon += ct.SoLuong;
                        _context.SanPhams.Update(SanPham);
                    }

                    newHoaDon.Add(ct);
                }

                decimal? totalAmount = newHoaDon.Sum(ct => ct.ThanhTien);
                model.TongTien = totalAmount;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Thêm hóa đơn thành công!" });

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_HoaDonNhap")]
        [HttpPut]
        public async Task<IActionResult> UpdateHoaDonNhap([FromBody] HoaDonNhap model)
        {
            try
            {
                var query = await _context.HoaDonNhaps.FindAsync(model.Id);

                if(query == null)
                {
                    return BadRequest(new { message = "Hóa đơn không tồn tại" });
                }

                query.NhaCungCapId = model.NhaCungCapId;
                query.TrangThaiThanhToan = model.TrangThaiThanhToan;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập hóa đơn thành công!" });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Search_HoaDonNhap")]
        [HttpGet]
        public async Task<IActionResult> SearchHoaDonNhap([FromQuery] int page = 1, int pageSize = 10)
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

                var query = _context.HoaDonNhaps.AsQueryable();

                //if (createdAt.HasValue)
                //{
                //    query = query.Where(hd => hd.CreatedAt <= createdAt.Value.Date);
                //}

                var totalItems = await query.CountAsync();

                var hoaDonList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(hd => new
                                            {
                                                hoaDon = hd,
                                                tenNguoiNhan = _context.NhanViens.Where(us => us.Id == hd.UserId).Select(a => a.HoTen).FirstOrDefault(),
                                                tenNhaCC = _context.NhaCungCaps.Where(dm => dm.Id == hd.NhaCungCapId).Select(a => a.TenNhaCC).FirstOrDefault()
                                            })
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
