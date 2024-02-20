using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class BinhLuanTinTuc
    {
        public int Id { get; set; }
        public int? UserAdminId { get; set; }
        public int? UserClientId { get; set; }
        public string? HoTen { get; set; }
        public string? Email { get; set; }
        public string? NoiDung { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual NhanVien? UserAdmin { get; set; }
        public virtual KhachHang? UserClient { get; set; }
    }
}
