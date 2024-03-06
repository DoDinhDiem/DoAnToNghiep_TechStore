using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class FeedBack
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? HoTen { get; set; }
        public string? Email { get; set; }
        public string? NoiDung { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool? TrangThai { get; set; }

        public virtual KhachHang? User { get; set; }
    }
}
