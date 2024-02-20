using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class ThongSo
    {
        public int Id { get; set; }
        public int? SanPhamId { get; set; }
        public string? TenThongSo { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual SanPham? SanPham { get; set; }
    }
}
