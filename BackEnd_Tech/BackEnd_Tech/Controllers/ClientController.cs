using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private TechStoreContext _context;
        public ClientController(TechStoreContext context)
        {
            _context = context;
        }

        //Lấy loại sản phẩm
        [Route("GetLoaiSanPham")]
        [HttpGet]
        public async Task<IActionResult> GetLoaiSanPham()
        {
            try
            {
                var query = await _context.LoaiSanPhams
                                          .Where(x => x.TrangThai == true)
                                          .ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy slide
        [Route("GetSlide")]
        [HttpGet]
        public async Task<IActionResult> GetSlide()
        {
            try
            {
                var query = await _context.Slides
                                          .Where(x => x.TrangThai == true)
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              anhSlide = x.Image
                                          })
                                          .ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy sản phẩm giảm giá
        [Route("GetSanPhamGiamGia")]
        [HttpGet]
        public async Task<IActionResult> GetSanPhamGiamGia()
        {
            try
            {
                var query = await _context.SanPhams
                                    .OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.LoaiSanPham.TrangThai == true && 
                                                p.HangSanPham.TrangThai == true && 
                                                p.TrangThai == true)
                                    .Where(p => p.GiamGia > 0)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaBan,
                                        giamGia = x.GiamGia,
                                        tenLoai = x.LoaiSanPham.TenLoai,
                                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a=> a.Image).FirstOrDefault()
                                    })
                                    .ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy sản phẩm mới
        [Route("GetSanPhamMoi")]
        [HttpGet]
        public async Task<IActionResult> GetSanPhamMoi()
        {
            try
            {
                DateTime ngayHienTai = DateTime.Now;
                DateTime ngayTruoc7Ngay = ngayHienTai.AddDays(-7);

                var query = await _context.SanPhams
                                    .OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.LoaiSanPham.TrangThai == true &&
                                                p.HangSanPham.TrangThai == true &&
                                                p.TrangThai == true)
                                    .Where(p => p.CreatedAt >= ngayTruoc7Ngay &&
                                                p.CreatedAt <= ngayHienTai)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaBan,
                                        giamGia = x.GiamGia,
                                        tenLoai = x.LoaiSanPham.TenLoai,
                                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                    })
                                    .ToListAsync();
                return Ok(query);
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
                                       x.GiaBan,
                                       x.GiamGia
                                   } into g
                                   select new
                                   {
                                       id = g.Key.Id,
                                       tenSanPham = g.Key.TenSanPham,
                                       giaBan = g.Key.GiaBan,
                                       giamGia = g.Key.GiamGia,
                                       avatar = _context.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault(),
                                       total = g.Count()
                                   }).ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy điện thoại
        [Route("GetDienThoai")]
        [HttpGet]
        public async Task<IActionResult> GetDienThoai()
        {
            try
            {
                var query = await _context.SanPhams
                                    .OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.LoaiSanPham.TrangThai == true &&
                                                p.HangSanPham.TrangThai == true &&
                                                p.TrangThai == true &&
                                                p.LoaiSanPham.TenLoai.ToLower() == "điện thoại")
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaBan,
                                        giamGia = x.GiamGia,
                                        tenLoai = x.LoaiSanPham.TenLoai,
                                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                    })
                                    .ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //Lấy laptop
        [Route("GetLapTop")]
        [HttpGet]
        public async Task<IActionResult> GetLapTop()
        {
            try
            {
                var query = await _context.SanPhams
                                    .OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.LoaiSanPham.TrangThai == true &&
                                                p.HangSanPham.TrangThai == true &&
                                                p.TrangThai == true &&
                                                p.LoaiSanPham.TenLoai.ToLower() == "laptop")
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaBan,
                                        giamGia = x.GiamGia,
                                        tenLoai = x.LoaiSanPham.TenLoai,
                                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                    })
                                    .ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy chi tiết sản phẩm
        [Route("GetChiTietSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetChiTietSanPham(int id)
        {
            try
            {
                var query = await _context.SanPhams
                                        .Where(a => a.Id == id)
                                        .Select(sp => new
                                        {
                                            sanPham = sp,
                                            anhSanPhams = sp.AnhSanPhams.Select(a => new { image = a.Image }).ToList(),
                                            thongSos = sp.ThongSos.Where(a => a.TrangThai == true)
                                                               .Select(a => new 
                                                               {
                                                                   tenThongSo = a.TenThongSo,
                                                                   moTa = a.MoTa}
                                                               ).ToList()
                                        }).FirstOrDefaultAsync();
                if(query == null)
                {
                    return BadRequest(new { message = "Sản phẩm không tồn tại!" });
                }
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy sản phẩm tương tự
        [Route("GetSanPhamTuongTu/{spid}/{loaiid}")]
        [HttpGet]
        public async Task<IActionResult> GetSanPhamTuongTu(int spid, int loaiid)
        {
            try
            {
                var query = await _context.SanPhams.OrderByDescending(p => p.CreatedAt)
                                    .Where(p => p.LoaiSanPham.TrangThai == true &&
                                                p.HangSanPham.TrangThai == true &&
                                                p.TrangThai == true  &&
                                                p.LoaiSanPhamId == loaiid &&
                                                p.Id != spid)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenSanPham = x.TenSanPham,
                                        giaBan = x.GiaBan,
                                        giamGia = x.GiamGia,
                                        tenLoai = x.LoaiSanPham.TenLoai,
                                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                    })
                                    .Take(10)
                                    .ToListAsync();

                if (query == null) 
                { 
                    return BadRequest(new { message = "Sản phẩm k tồn tại!" });
                }

                return Ok(query);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Sản phẩm theo loại
        [Route("GetSanPhamByLoaiAndHang")]
        [HttpGet]
        public async Task<IActionResult> GetSanPhamByLoai([FromQuery] int id, int? hangid, string? sapXep, int? giaMin, int? giaMax, int page = 1, int pageSize = 10)
        {
            try
            {
                if (page < 1)
                {
                    page = 1;
                }

                if (pageSize < 1)
                {
                    pageSize = 12;
                }

                var query = _context.SanPhams
                    .Where(p => p.LoaiSanPham.TrangThai == true &&
                                p.HangSanPham.TrangThai == true &&
                                p.TrangThai == true &&
                                p.LoaiSanPhamId == id);

                if (hangid != null)
                {
                    query = query.Where(p => p.HangSanPhamId == hangid);
                }

                if (!string.IsNullOrEmpty(sapXep))
                {
                    switch (sapXep.ToLower())
                    {
                        case "pricemin":
                            query = query.OrderBy(p => p.GiaBan);
                            break;
                        case "pricemax":
                            query = query.OrderByDescending(p => p.GiaBan);
                            break;
                        case "date":
                            query = query.OrderByDescending(p => p.CreatedAt);
                            break;
                        default:
                            break;
                    }
                }
                if (giaMin != null && giaMax != null)
                {
                    query = query.Where(p => p.GiaBan >= giaMin && p.GiaBan <= giaMax);
                }

                var totalItems = await query.CountAsync();

                var sanPhamList = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(x => new
                    {
                        id = x.Id,
                        tenSanPham = x.TenSanPham,
                        giaBan = x.GiaBan,
                        giamGia = x.GiamGia,
                        tenLoai = x.LoaiSanPham.TenLoai,
                        avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                    })
                    .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = sanPhamList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Lấy ra danh sách hãng có trong loại sản phẩm
        [Route("GetGiaLonNhatTheoLoai/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAllHang(int id)
        {
            try
            {
                var maxPrice = await _context.SanPhams
                    .Where(p => p.LoaiSanPham.TrangThai == true && p.HangSanPham.TrangThai == true && p.TrangThai == true && p.LoaiSanPhamId == id)
                    .MaxAsync(p => p.GiaBan);

                return Ok(maxPrice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy loại tin tức
        [Route("GetLoaiTinTuc")]
        [HttpGet]
        public async Task<IActionResult> GetLoaiTinTuc()
        {
            try
            {
                var query = await _context.DanhMucTinTucs
                                        .Where(x => x.TrangThai == true)
                                        .Select(x => new
                                        {
                                            id = x.Id,
                                            tenTinTuc = x.TenDanhMuc
                                        }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy danh sách loại tin tức
        [Route("GetTinTucByLoai/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetTinTucByLoai(int id)
        {
            try
            {
                var query = await _context.TinTucs
                                    .Where(x => x.DanhMuc.TrangThai == true && 
                                                x.TrangThai == true &&
                                                x.DanhMucId == id )
                                    .FirstOrDefaultAsync();
                return Ok(query);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra tin tức liên quan
        [Route("GetTinTucLienQuan/{id}/{loaiid}/")]
        [HttpGet]
        public async Task<IActionResult> GetTinTucLienQuan(int id, int loaiid)
        {
            try
            {
                var query = await _context.TinTucs
                                        .OrderByDescending(x => x.CreatedAt)
                                        .Where(x => x.DanhMuc.TrangThai == true &&
                                                x.TrangThai == true &&
                                                x.DanhMucId == loaiid &&
                                                x.Id != id)
                                        .Take(5)
                                        .ToListAsync();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy chi tiết tin tức
        [Route("GetChiTietTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetChiTietTinTuc(int id)
        {
            try
            {
                var query = await _context.TinTucs
                                    .Where(x => x.Id == id)
                                    .FirstOrDefaultAsync();
                if(query == null)
                {
                    return BadRequest(new { message = "Tin tức không tồn tại!" });
                }
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra bình luận tin tức
        [Route("GetBinhLuanTinTuc")]
        [HttpGet]
        public async Task<IActionResult> GetBinhLuanTinTuc(int page = 1, int pageSize = 10)
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

                var query = _context.BinhLuanTinTucs
                                     .Where(x => x.TrangThai == true)
                                     .Skip((page - 1) * pageSize)
                                     .Take(pageSize);

                var binhLuanTinTucList = await query.ToListAsync();

                var totalItems = await _context.BinhLuanTinTucs.CountAsync(x => x.TrangThai == true);

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = binhLuanTinTucList
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra giới thiệu của hàng
        [Route("GetGioiThieu")]
        [HttpGet]
        public async Task<IActionResult> GetGioiThieu()
        {
            try
            {
                var query = await _context.Abouts.FirstOrDefaultAsync();
                var nhanvien = await _context.NhanViens
                                            .Where(x => x.TrangThai == true)
                                            .Select(x => new
                                            {
                                                anh = x.Avatar,
                                                hoTen = x.HoTen,
                                                chucVu = x.ChucVu.TenChucVu
                                            }).ToListAsync();
                return Ok(new { about = query, nhanvien = nhanvien});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra thông tin liên hệ cửa hàng
        [Route("GetLienHe")]
        [HttpGet]
        public async Task<IActionResult> GetLienHe()
        {
            try
            {
                var query = await _context.Contacts.FirstOrDefaultAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy ra sản phẩm tìm kiếm
        [Route("GetSearchSanPham")]
        [HttpGet]
        public async Task<IActionResult> SearchHangSanPham([FromQuery] string key, int page = 1, int pageSize = 20)
        {
            try
            {
                if (page < 1)
                {
                    page = 1;
                }

                if (pageSize < 1)
                {
                    pageSize = 20;
                }

                var query = _context.SanPhams.AsQueryable();

                    query = query.Where(l => l.TenSanPham.Contains(key));

                var totalItems = await query.CountAsync();

                var productList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                                 .Select(x => new
                                                 {
                                                     id = x.Id,
                                                     tenSanPham = x.TenSanPham,
                                                     giaBan = x.GiaBan,
                                                     giamGia = x.GiamGia,
                                                     tenLoai = x.LoaiSanPham.TenLoai,
                                                     avatar = x.AnhSanPhams.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                                 })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = productList
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
