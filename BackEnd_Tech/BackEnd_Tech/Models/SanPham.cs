using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class SanPham
    {
        public SanPham()
        {
            AnhSanPhams = new HashSet<AnhSanPham>();
            ChiTietHoaDonNhaps = new HashSet<ChiTietHoaDonNhap>();
            ChiTietHoaDonXuats = new HashSet<ChiTietHoaDonXuat>();
            ThongSos = new HashSet<ThongSo>();
        }

        public int Id { get; set; }
        public int? LoaiSanPhamId { get; set; }
        public int? HangSanPhamId { get; set; }
        public string? TenSanPham { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? GiamGia { get; set; }
        public int? SoLuongTon { get; set; }
        public string? BaoHang { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual HangSanPham? HangSanPham { get; set; }
        public virtual LoaiSanPham? LoaiSanPham { get; set; }
        public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; }
        public virtual ICollection<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }
        public virtual ICollection<ChiTietHoaDonXuat> ChiTietHoaDonXuats { get; set; }
        public virtual ICollection<ThongSo> ThongSos { get; set; }
    }
}
