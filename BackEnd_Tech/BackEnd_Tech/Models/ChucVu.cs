using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class ChucVu
    {
        public ChucVu()
        {
            NhanViens = new HashSet<NhanVien>();
        }

        public int Id { get; set; }
        public string? TenChucVu { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<NhanVien> NhanViens { get; set; }
    }
}
