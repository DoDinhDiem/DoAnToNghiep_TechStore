using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class About
    {
        public int Id { get; set; }
        public string? GioiThieu { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
