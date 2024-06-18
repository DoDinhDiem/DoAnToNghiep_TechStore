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

    public class DashBoardController : ControllerBase
    {
        private TechStoreMainContext _context;
        public DashBoardController(TechStoreMainContext context) {
            _context = context;
        }

        [Route("CountDonHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountDonHang()
        {
            try
            {
                var query = _context.HoaDonXuats.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountDoanhThu")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountDoanhThu()
        {
            try
            {
                var query = _context.HoaDonXuats.Where(x => x.TrangThaiThanhToan == true && x.TrangThaiDonHang != 4).Sum(x => x.TongTien);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountSanPham")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountSanPham()
        {
            try
            {
                var query = _context.SanPhams.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountKhachHang")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountKhachHang()
        {
            try
            {
                var query = _context.KhachHangs.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountTinTuc")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountTinTuc()
        {
            try
            {
                var query = _context.TinTucs.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("CountNhanVien")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountNhanVien()
        {
            try
            {
                var query = _context.NhanViens.Count();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeTheoThang/{year}")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoThang(int year)
        {
            try
            {
                var query = Enumerable.Range(1, 12)
                    .Select(month => new
                    {
                        Thang = month,
                        TongTien = _context.HoaDonXuats
                            .Where(hd => hd.CreatedAt.HasValue &&
                                         hd.CreatedAt.Value.Year == year &&
                                         hd.CreatedAt.Value.Month == month &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien) 
                    })
                    .ToList();
                var tongTienNam = _context.HoaDonXuats.Where(hd => hd.CreatedAt.HasValue &&
                        hd.CreatedAt.Value.Year == year &&
                        hd.TrangThaiThanhToan == true && hd.TrangThaiDonHang != 4).Sum(hd => hd.TongTien) ;
                var result = new
                {
                    ThongKeThang = query,
                    TongTienNam = tongTienNam
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       

        [Route("ThongKeTheoNgayTrongTuan")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoNgayTrongTuan()
        {
            try
            {
                // Lấy ngày đầu tiên của tuần hiện tại
                DateTime startOfWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);

                var query = Enumerable.Range(0, 7)
                    .Select(offset => new
                    {
                        Ngay = startOfWeek.AddDays(offset).Date,
                        TongTien = _context.HoaDonXuats
                            .Where(hd => hd.CreatedAt.HasValue &&
                                         hd.CreatedAt.Value.Date == startOfWeek.AddDays(offset).Date &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien) 
                    })
                    .ToList();

                var TongTuan = _context.HoaDonXuats
                        .Where(hd => hd.CreatedAt.HasValue &&
                                     hd.CreatedAt.Value.Date >= startOfWeek.Date &&
                                     hd.CreatedAt.Value.Date <= startOfWeek.AddDays(7).Date &&
                                     hd.TrangThaiThanhToan == true)
                        .Sum(hd => hd.TongTien) ;

                var result = new
                {

                    ThongKeTuan = query,
                    TongTienTuan = TongTuan,
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ThongKeTheoNgayTrongTuanTruoc")]
        [HttpGet]
        public async Task<IActionResult> GetThongKeTheoNgayTrongTuanTuanTruoc()
        {
            try
            {
                // Lấy ngày đầu tiên của tuần trước
                DateTime startOfLastWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek).AddDays(-7);

                var query = Enumerable.Range(0, 7)
                    .Select(offset => new
                    {
                        Ngay = startOfLastWeek.AddDays(offset).Date,
                        TongTien = _context.HoaDonXuats
                            .Where(hd => hd.CreatedAt.HasValue &&
                                         hd.CreatedAt.Value.Date == startOfLastWeek.AddDays(offset).Date &&
                                         hd.TrangThaiThanhToan == true)
                            .Sum(hd => hd.TongTien) 
                    })
                    .ToList();

                var TongTuan = _context.HoaDonXuats
                    .Where(hd => hd.CreatedAt.HasValue &&
                                 hd.CreatedAt.Value.Date >= startOfLastWeek.Date &&
                                 hd.CreatedAt.Value.Date <= startOfLastWeek.AddDays(6).Date &&
                                 hd.TrangThaiThanhToan == true)
                    .Sum(hd => hd.TongTien) ;

                var result = new
                {
                    ThongKeTuan = query,
                    TongTienTuan = TongTuan,

                };


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //Lấy sản phẩm bán chạy
        [Route("GetSanPhamBanChay")]
        [HttpGet]
        public async Task<IActionResult> GetSanPhamBanChay()
        {
            try
            {
                var query = await (from x in _context.SanPhams
                                   join ct in _context.ChiTietHoaDonXuats on x.Id equals ct.SanPhamId
                                   where x.LoaiSanPham.TrangThai == true &&
                                         x.HangSanPham.TrangThai == true &&
                                         x.TrangThai == true
                                   group x by new
                                   {
                                       x.Id,
                                       x.TenSanPham,
                                       x.LoaiSanPhamId,
                                       x.SoLuongTon,
                                       x.GiaBan,
                                       x.GiamGia
                                   } into g
                                   select new
                                   {
                                       id = g.Key.Id,
                                       tenSanPham = g.Key.TenSanPham,
                                       loaiSanPhamId = g.Key.LoaiSanPhamId,
                                       soLuong = g.Key.SoLuongTon,
                                       giaBan = g.Key.GiaBan,
                                       giamGia = g.Key.GiamGia ?? 0,
                                       total = g.Count()
                                   })
                                   .OrderByDescending(x => x.total)
                                   .Take(6)
                                   .ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
