using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class LichSuGiaoDich
    {
        public int Id { get; set; }
        public int? ViTechStoreId { get; set; }
        public decimal? SoTien { get; set; }
        public decimal? SoDuTruocDo { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ViTechStore? ViTechStore { get; set; }
    }
}
