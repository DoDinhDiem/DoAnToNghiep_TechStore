using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class DanhMucTinTuc
    {
        public DanhMucTinTuc()
        {
            TinTucs = new HashSet<TinTuc>();
        }

        public int Id { get; set; }
        public string? TenDanhMuc { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<TinTuc> TinTucs { get; set; }
    }
}
