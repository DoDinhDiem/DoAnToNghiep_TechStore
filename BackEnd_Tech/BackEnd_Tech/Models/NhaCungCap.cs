using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class NhaCungCap
    {
        public NhaCungCap()
        {
            HoaDonNhaps = new HashSet<HoaDonNhap>();
        }

        public int Id { get; set; }
        public string? TenNhaCC { get; set; }
        public string? Email { get; set; }
        public int? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<HoaDonNhap> HoaDonNhaps { get; set; }
    }
}
