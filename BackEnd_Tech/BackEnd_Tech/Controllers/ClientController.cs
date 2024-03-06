using BackEnd_Tech.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
                                          .Select(x => new
                                          {
                                              id = x.Id,
                                              tenLoai = x.TenLoai,
                                              countProduct = x.SanPhams.Count()
                                          })
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
                                        loaiSanPhamId = x.LoaiSanPhamId,
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
                                        loaiSanPhamId = x.LoaiSanPhamId,
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
                                       x.LoaiSanPhamId,
                                       x.GiaBan,
                                       x.GiamGia
                                   } into g
                                   select new
                                   {
                                       id = g.Key.Id,
                                       tenSanPham = g.Key.TenSanPham,
                                       loaiSanPhamId = g.Key.LoaiSanPhamId,
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
                                        loaiSanPhamId = x.LoaiSanPhamId,
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
                                        loaiSanPhamId = x.LoaiSanPhamId,
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

        [Route("GetTinTuc")]
        [HttpGet]
        public async Task<IActionResult> GetTinTuc()
        {
            try
            {
                var query = await _context.TinTucs
                                    .Where(x => x.DanhMuc.TrangThai == true &&
                                                x.TrangThai == true)
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenUser = x.User.HoTen,
                                        tieuDe = x.TieuDe,
                                        noiDung = x.NoiDung,
                                        createdAt = x.CreatedAt,
                                        anh = _context.AnhTinTucs.Where(a => a.TinTucId == x.Id).Select(a => a.Image).FirstOrDefault()
                                    })
                                    .Take(10)
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
                                            id = sp.Id,
                                            tenSanPham = sp.TenSanPham,
                                            giaBan = sp.GiaBan,
                                            giamGia = sp.GiamGia,
                                            soLuongTon = sp.SoLuongTon,
                                            baoHang = sp.BaoHang,
                                            moTa = sp.MoTa,
                                            loaiSanPhamId = sp.LoaiSanPhamId,
                                            hangSanPhamId = sp.HangSanPhamId,
                                            avatar = sp.AnhSanPhams.Where(a => a.SanPhamId == sp.Id).Select(a => a.Image ).FirstOrDefault(),
                                            tenLoai = sp.LoaiSanPham.TenLoai,
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
                                        loaiSanPhamId = x.LoaiSanPhamId,
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
        public async Task<IActionResult> GetSanPhamByLoai([FromQuery] int id, int? hangid, string? sapXep, int? giaMax, int page = 1, int pageSize = 10)
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
                        case "name":
                            query = query.OrderBy(p => p.TenSanPham);
                            break;
                        case "date":
                            query = query.OrderByDescending(p => p.CreatedAt);
                            break;
                        default:
                            break;
                    }
                }
                if (giaMax != null)
                {
                    query = query.Where(p => p.GiaBan <= giaMax);
                }

                var totalItems = await query.CountAsync();
                var loaisp = await _context.LoaiSanPhams.Where(x => x.Id == id).Select(x => x.TenLoai ).FirstOrDefaultAsync();
                var sanPhamList = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(x => new
                    {
                        id = x.Id,
                        tenSanPham = x.TenSanPham,
                        loaiSanPhamId = x.LoaiSanPhamId,
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
                    category = loaisp,
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

        [Route("GetHangSanPham/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetAllHangByLoaiId(int id)
        {
            try
            {

                var uniqueBrands = await _context.SanPhams
                    .Where(p => p.LoaiSanPham.TrangThai == true && p.HangSanPham.TrangThai == true && p.TrangThai == true && p.LoaiSanPhamId == id)
                    .Select(x => new { x.HangSanPhamId, x.HangSanPham.TenHang })
                    .Distinct()
                    .OrderBy(x => x.HangSanPhamId)
                    .ToListAsync();

                return Ok(uniqueBrands);
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
                                            tenTinTuc = x.TenDanhMuc,
                                            countNew = x.TinTucs.Count()
                                        }).ToListAsync();
                return Ok(query);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Lấy danh sách loại tin tức
        [Route("GetTinTucByLoai")]
        [HttpGet]
        public async Task<IActionResult> GetTinTucByLoai([FromQuery] int id, int page = 1, int pageSize = 10)
        {
            try
            {
                var query =  _context.TinTucs.Where(x => x.DanhMuc.TrangThai == true &&
                                                x.TrangThai == true &&
                                                x.DanhMucId == id);

                var totalItems = await query.CountAsync();
                var loaiTinTuc = _context.DanhMucTinTucs.Where(a => a.Id == id).Select(a => a.TenDanhMuc);
                var tinTucList = await query
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .Select(x => new
                                            {
                                                id = x.Id,
                                                tenUser = _context.NhanViens.Where(u => u.Id == x.UserId).Select(a => a.HoTen).FirstOrDefault(),
                                                tieuDe = x.TieuDe,
                                                noiDung = x.NoiDung,
                                                createdAt = x.CreatedAt,
                                                anhTinTuc = x.AnhTinTucs.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                            })
                                            .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                    PageSize = pageSize,
                    PageNumber = page,
                    tenLoaiTinTuc = loaiTinTuc,
                    Items = tinTucList
                };

                return Ok(response);

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
                                        .Select(x => new
                                        {
                                            id = x.Id,
                                            tieuDe = x.TieuDe,
                                            createdAt = x.CreatedAt,
                                            anhTinTuc = x.AnhTinTucs.Where(a => a.TrangThai == true).Select(a => a.Image).FirstOrDefault()
                                        })
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
                                    .Select(x => new
                                    {
                                        id = x.Id,
                                        tenUser = _context.NhanViens.Where(a => a.Id == x.UserId ).Select(a=> a.HoTen).FirstOrDefault(),
                                        danhMucId = x.DanhMucId,
                                        tenDanhMuc = x.DanhMuc.TenDanhMuc,
                                        tieuDe = x.TieuDe,
                                        noiDung = x.NoiDung,
                                        createdAt = x.CreatedAt,
                                        anhTinTuc = x.AnhTinTucs.Where(a => a.TrangThai == true).Select(a=> a.Image).FirstOrDefault()

                                    })
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
        [Route("GetBinhLuanTinTuc/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetBinhLuanTinTuc(int id)
        {
            try
            {
                var query = await _context.BinhLuanTinTucs
                                     .Where(x => x.TrangThai == true && x.TinTucId == id)
                                     .Select(x => new
                                     {
                                         id = x.Id,
                                         hoTen = x.HoTen,
                                         noiDung = x.NoiDung,
                                         avatar = x.KhachHang.Avatar,
                                         createdAt = x.CreatedAt,
                                     }).ToListAsync();

                var totalItems = await _context.BinhLuanTinTucs.CountAsync(x => x.TrangThai == true && x.TinTucId == id);

                var response = new
                {
                    TotalItems = totalItems,
                    Items = query
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetPhanHoiBinhLuan/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetPhanHoiBinhLuan(int id)
        {
            try
            {
                var query = await _context.PhanHoiBinhLuanTinTucs
                                     .Where(x => x.TrangThai == true && x.TinTucId == id)
                                     .Select(x => new
                                     {
                                         id = x.Id,
                                         binhLuanId = x.BinhLuanId,
                                         hoTen = x.HoTen,
                                         noiDung = x.NoiDung,
                                         avatarClient = _context.KhachHangs.Where(a => a.Id == x.KhachHangId).Select(a => a.Avatar).FirstOrDefault(),
                                         avatar = _context.NhanViens.Where(a => a.Id == x.NhanVienId).Select(a => a.Avatar).FirstOrDefault(),
                                         createdAt = x.CreatedAt,
                                     }).ToListAsync();

                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_BinhLuanTinTuc")]
        [HttpPost]
        public async Task<IActionResult> CreateBinhLuanTinTuc([FromBody] BinhLuanTinTuc model)
        {
            try
            {
                _context.BinhLuanTinTucs.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Thêm bình luận thành cồng!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [Route("Create_PhanHoiBinhLuan")]
        [HttpPost]
        public async Task<IActionResult> CreatePhanHoiBinhLuan([FromBody] PhanHoiBinhLuanTinTuc model)
        {
            try
            {   model.HoTen = _context.KhachHangs.Where(a => a.Id == model.KhachHangId).Select(a => a.HoTen).FirstOrDefault();
                _context.PhanHoiBinhLuanTinTucs.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new {message = "Bình luận thành công"});
            }catch (Exception ex)
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
        public async Task<IActionResult> SearchSanPham([FromQuery] string key, int page = 1, int pageSize = 20)
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

                if (key == null)
                {
                    var responseWhenKeyIsNull = new
                    {
                        TotalItems = 0
                    };
                    return Ok(responseWhenKeyIsNull);
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

        [Authorize]
        [Route("GetById_KhachHang/{email}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdKhachHang(string email)
        {
            try
            {
                var query = await _context.KhachHangs.Where(x => x.Email == email).SingleOrDefaultAsync();
                if (query == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại!" });
                }
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Update_KhachHang")]
        [HttpPut]
        public async Task<IActionResult> UpdateKhachHang([FromBody] KhachHang model)
        {
            try
            {
                var query = await _context.KhachHangs.FindAsync(model.Id);
                if (query == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại!" });
                }

                query.HoTen = model.HoTen;
                query.DiaChi = model.DiaChi;
                query.GioiTinh = model.GioiTinh;
                query.NgaySinh = model.NgaySinh;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhập thông tin khách hàng thành công" });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("Create_HoaDonXuat")]
        [HttpPost]
        public async Task<IActionResult> CreateHoaDonBan([FromBody] HoaDonXuat model)
        {
            try
            {
                _context.HoaDonXuats.Add(model);

                var newHoaDon = new List<ChiTietHoaDonXuat>();

                foreach (var cthd in model.ChiTietHoaDonXuats)
                {

                    var ct = new ChiTietHoaDonXuat
                    {
                        HoaDonXuatId = model.Id,
                        SanPhamId = cthd.SanPhamId,
                        SoLuong = cthd.SoLuong,
                        GiaBan = cthd.GiaBan,
                        ThanhTien = cthd.ThanhTien
                    };
                    newHoaDon.Add(ct);

                }
                decimal? totalAmount = newHoaDon.Sum(ct => ct.ThanhTien);
                decimal? giamGia = model.GiamGia ?? 0;
                model.TongTien = totalAmount - giamGia;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    id = model.Id,
                    message = "Đặt hàng thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_LichSuGiaoDich")]
        [HttpPost]
        public async Task<IActionResult> CreateLichSuGiaoDich([FromBody] LichSuGiaoDich model)
        {
            try
            {
                _context.LichSuGiaoDiches.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Create_FeedBack")]
        [HttpPost]
        public async Task<IActionResult> CreateFeedBack([FromBody] FeedBack model)
        {
            try
            {
                _context.FeedBacks.Add(model);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Phản hồi đã được lưu giữ" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("LichSuMuaHang")]
        [HttpGet]
        public async Task<IActionResult> SearchHoaDonXuat([FromQuery] string email, int? trangThai, int page = 1, int pageSize = 10)
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

                var query = _context.HoaDonXuats.Where(x => x.Email == email);

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

                var totalAmount = await query.SumAsync(x => x.TongTien);

                var hoaDonList = await query
                    .OrderByDescending(x => x.CreatedAt) // Sắp xếp theo thời gian tạo, mới nhất đầu danh sách
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(hd => new
                    {
                        ChiTiet = _context.ChiTietHoaDonXuats
                            .Where(ct => ct.HoaDonXuatId == hd.Id)
                            .Select(a => new
                            {
                                TenSP = _context.SanPhams.Where(sp => sp.Id == a.SanPhamId).Select(sp => sp.TenSanPham).FirstOrDefault(),
                                AnhSP = _context.AnhSanPhams.Where(sp => sp.SanPhamId == a.SanPhamId).Select(sp => sp.Image).FirstOrDefault(),
                                SoLuong = a.SoLuong,
                                GiaBan = a.GiaBan,
                                ThanhTien = a.ThanhTien
                            }).ToList()
                    })
                    .ToListAsync();

                var response = new
                {
                    TotalItems = totalItems,
                    TotalAmount = totalAmount,
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
