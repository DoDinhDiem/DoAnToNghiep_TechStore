using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class LichSuGiaoDich
    {
        public int Id { get; set; }
        public int? KhachHangId { get; set; }
        public int? HoaDonId { get; set; }
        public decimal? SoTien { get; set; }
        public string? NganHang { get; set; }
        public string? LoaiThe { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual HoaDonXuat? HoaDon { get; set; }
        public virtual KhachHang? KhachHang { get; set; }
    }
}
