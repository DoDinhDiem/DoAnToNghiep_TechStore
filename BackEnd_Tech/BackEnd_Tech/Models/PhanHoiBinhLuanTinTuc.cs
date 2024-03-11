using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class PhanHoiBinhLuanTinTuc
    {
        public int Id { get; set; }
        public int? BinhLuanId { get; set; }
        public int? NhanVienId { get; set; }
        public int? KhachHangId { get; set; }
        public int? TinTucId { get; set; }
        public string? HoTen { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual BinhLuanTinTuc? BinhLuan { get; set; }
        public virtual TinTuc? TinTuc { get; set; }
    }
}
