using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class Contact
    {
        public int Id { get; set; }
        public string? Map { get; set; }
        public string? Duong { get; set; }
        public string? ThonXom { get; set; }
        public string? XaPhuong { get; set; }
        public string? QuanHuyen { get; set; }
        public string? TinhThanhPho { get; set; }
        public string? Email { get; set; }
        public int? SoDienThoai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
