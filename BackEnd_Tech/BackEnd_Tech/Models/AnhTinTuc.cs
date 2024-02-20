using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class AnhTinTuc
    {
        public int Id { get; set; }
        public int? TinTucId { get; set; }
        public string? Image { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual TinTuc? TinTuc { get; set; }
    }
}
