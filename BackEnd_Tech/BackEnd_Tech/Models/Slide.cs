using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class Slide
    {
        public int Id { get; set; }
        public string? Image { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
