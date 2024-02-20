using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class ViTechStore
    {
        public ViTechStore()
        {
            LichSuGiaoDiches = new HashSet<LichSuGiaoDich>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public decimal? SoTien { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual KhachHang? User { get; set; }
        public virtual ICollection<LichSuGiaoDich> LichSuGiaoDiches { get; set; }
    }
}
