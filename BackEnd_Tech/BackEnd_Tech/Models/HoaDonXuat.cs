using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class HoaDonXuat
    {
        public HoaDonXuat()
        {
            ChiTietHoaDonXuats = new HashSet<ChiTietHoaDonXuat>();
            LichSuGiaoDiches = new HashSet<LichSuGiaoDich>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? HoTen { get; set; }
        public int? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? GhiChu { get; set; }
        public decimal? GiamGia { get; set; }
        public decimal? TongTien { get; set; }
        public int? TrangThaiDonHang { get; set; }
        public bool? TrangThaiThanhToan { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? PhuongThucGiaoDich { get; set; }

        public virtual KhachHang? User { get; set; }
        public virtual ICollection<ChiTietHoaDonXuat> ChiTietHoaDonXuats { get; set; }
        public virtual ICollection<LichSuGiaoDich> LichSuGiaoDiches { get; set; }
    }
}
