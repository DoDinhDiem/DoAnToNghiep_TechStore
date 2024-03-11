using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class BinhLuanTinTuc
    {
        public BinhLuanTinTuc()
        {
            PhanHoiBinhLuanTinTucs = new HashSet<PhanHoiBinhLuanTinTuc>();
        }

        public int Id { get; set; }
        public int? TinTucId { get; set; }
        public int? KhachHangId { get; set; }
        public string? HoTen { get; set; }
        public string? Email { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual KhachHang? KhachHang { get; set; }
        public virtual TinTuc? TinTuc { get; set; }
        public virtual ICollection<PhanHoiBinhLuanTinTuc> PhanHoiBinhLuanTinTucs { get; set; }
    }
}
