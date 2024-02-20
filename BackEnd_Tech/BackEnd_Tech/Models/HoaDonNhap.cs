using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class HoaDonNhap
    {
        public HoaDonNhap()
        {
            ChiTietHoaDonNhaps = new HashSet<ChiTietHoaDonNhap>();
        }

        public int Id { get; set; }
        public int? NhaCungCapId { get; set; }
        public int? UserId { get; set; }
        public decimal? TongTien { get; set; }
        public string? TrangThaiThanhToan { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual NhaCungCap? NhaCungCap { get; set; }
        public virtual NhanVien? User { get; set; }
        public virtual ICollection<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }
    }
}
