using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class TinTuc
    {
        public TinTuc()
        {
            AnhTinTucs = new HashSet<AnhTinTuc>();
            BinhLuanTinTucs = new HashSet<BinhLuanTinTuc>();
            PhanHoiBinhLuanTinTucs = new HashSet<PhanHoiBinhLuanTinTuc>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? DanhMucId { get; set; }
        public string? TieuDe { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual DanhMucTinTuc? DanhMuc { get; set; }
        public virtual NhanVien? User { get; set; }
        public virtual ICollection<AnhTinTuc> AnhTinTucs { get; set; }
        public virtual ICollection<BinhLuanTinTuc> BinhLuanTinTucs { get; set; }
        public virtual ICollection<PhanHoiBinhLuanTinTuc> PhanHoiBinhLuanTinTucs { get; set; }
    }
}
