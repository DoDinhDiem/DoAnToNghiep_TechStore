using System;
using System.Collections.Generic;

namespace BackEnd_Tech.Models
{
    public partial class KhachHang
    {
        public KhachHang()
        {
            BinhLuanTinTucs = new HashSet<BinhLuanTinTuc>();
            FeedBacks = new HashSet<FeedBack>();
            ViTechStores = new HashSet<ViTechStore>();
        }

        public int Id { get; set; }
        public string? Email { get; set; }
        public string? PassWord { get; set; }
        public string? HoTen { get; set; }
        public int? SoDienThoai { get; set; }
        public string? DiaChi { get; set; }
        public string? GioiTinh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public bool? TrangThai { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<BinhLuanTinTuc> BinhLuanTinTucs { get; set; }
        public virtual ICollection<FeedBack> FeedBacks { get; set; }
        public virtual ICollection<ViTechStore> ViTechStores { get; set; }
    }
}
