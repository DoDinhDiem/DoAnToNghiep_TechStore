using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class KhachHang
    {
        public KhachHang()
        {
            BinhLuanTinTucs = new HashSet<BinhLuanTinTuc>();
            FeedBacks = new HashSet<FeedBack>();
            HoaDonXuats = new HashSet<HoaDonXuat>();
            LichSuGiaoDiches = new HashSet<LichSuGiaoDich>();
        }

        public int Id { get; set; }
        public string? Email { get; set; }
        public string? PassWord { get; set; }
        public string? HoTen { get; set; }
        public int? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Avatar { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public int? VeryOtp { get; set; }
        public DateTime? VeryDate { get; set; }

        public virtual ICollection<BinhLuanTinTuc> BinhLuanTinTucs { get; set; }
        public virtual ICollection<FeedBack> FeedBacks { get; set; }
        public virtual ICollection<HoaDonXuat> HoaDonXuats { get; set; }
        public virtual ICollection<LichSuGiaoDich> LichSuGiaoDiches { get; set; }
    }
}
