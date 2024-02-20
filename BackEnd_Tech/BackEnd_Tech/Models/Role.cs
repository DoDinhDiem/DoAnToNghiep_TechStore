using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class Role
    {
        public Role()
        {
            NhanViens = new HashSet<NhanVien>();
        }

        public int Id { get; set; }
        public string? TenRole { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<NhanVien> NhanViens { get; set; }
    }
}
