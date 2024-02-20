using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class ChiTietHoaDonXuat
    {
        public int Id { get; set; }
        public int? HoaDonXuatId { get; set; }
        public int? SanPhamId { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? SoLuong { get; set; }
        public decimal? ThanhTien { get; set; }

        public virtual HoaDonXuat? HoaDonXuat { get; set; }
        public virtual SanPham? SanPham { get; set; }
    }
}
