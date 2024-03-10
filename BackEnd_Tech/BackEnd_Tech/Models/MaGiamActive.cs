using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class MaGiamActive
    {
        public int Id { get; set; }
        public int? MaGiamGiaId { get; set; }
        public int? KhachHangId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual KhachHang? KhachHang { get; set; }
        public virtual MaGiamGium? MaGiamGia { get; set; }
    }
}
