using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class HangSanPham
    {
        public HangSanPham()
        {
            SanPhams = new HashSet<SanPham>();
        }

        public int Id { get; set; }
        public string? TenHang { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
