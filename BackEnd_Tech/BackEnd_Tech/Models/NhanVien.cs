using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class NhanVien
    {
        public NhanVien()
        {
            BinhLuanTinTucs = new HashSet<BinhLuanTinTuc>();
            HoaDonNhaps = new HashSet<HoaDonNhap>();
            HoaDonXuats = new HashSet<HoaDonXuat>();
            TinTucs = new HashSet<TinTuc>();
        }

        public int Id { get; set; }
        public int? RoleId { get; set; }
        public string? Email { get; set; }
        public string? PassWord { get; set; }
        public string? Avatar { get; set; }
        public string? HoTen { get; set; }
        public int? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public DateTime? NgayVaoLam { get; set; }
        public int? ChucVuId { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ChucVu? ChucVu { get; set; }
        public virtual Role? Role { get; set; }
        public virtual ICollection<BinhLuanTinTuc> BinhLuanTinTucs { get; set; }
        public virtual ICollection<HoaDonNhap> HoaDonNhaps { get; set; }
        public virtual ICollection<HoaDonXuat> HoaDonXuats { get; set; }
        public virtual ICollection<TinTuc> TinTucs { get; set; }
    }
}
