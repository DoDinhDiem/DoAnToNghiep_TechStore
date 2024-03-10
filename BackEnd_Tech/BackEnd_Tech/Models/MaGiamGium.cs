using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class MaGiamGium
    {
        public MaGiamGium()
        {
            MaGiamActives = new HashSet<MaGiamActive>();
        }

        public int Id { get; set; }
        public string? MaGiamGia { get; set; }
        public decimal? SoTienGiam { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public int? SoLuong { get; set; }
        public DateTime? HanSuDung { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<MaGiamActive> MaGiamActives { get; set; }
    }
}
