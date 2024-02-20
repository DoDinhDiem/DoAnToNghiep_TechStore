using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackEnd_Tech.Models
{
    public partial class TechStoreContext : DbContext
    {
        public TechStoreContext()
        {
        }

        public TechStoreContext(DbContextOptions<TechStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<About> Abouts { get; set; } = null!;
        public virtual DbSet<AnhSanPham> AnhSanPhams { get; set; } = null!;
        public virtual DbSet<AnhTinTuc> AnhTinTucs { get; set; } = null!;
        public virtual DbSet<BinhLuanTinTuc> BinhLuanTinTucs { get; set; } = null!;
        public virtual DbSet<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; } = null!;
        public virtual DbSet<ChiTietHoaDonXuat> ChiTietHoaDonXuats { get; set; } = null!;
        public virtual DbSet<ChucVu> ChucVus { get; set; } = null!;
        public virtual DbSet<Contact> Contacts { get; set; } = null!;
        public virtual DbSet<DanhMucTinTuc> DanhMucTinTucs { get; set; } = null!;
        public virtual DbSet<FeedBack> FeedBacks { get; set; } = null!;
        public virtual DbSet<HangSanPham> HangSanPhams { get; set; } = null!;
        public virtual DbSet<HoaDonNhap> HoaDonNhaps { get; set; } = null!;
        public virtual DbSet<HoaDonXuat> HoaDonXuats { get; set; } = null!;
        public virtual DbSet<KhachHang> KhachHangs { get; set; } = null!;
        public virtual DbSet<LichSuGiaoDich> LichSuGiaoDiches { get; set; } = null!;
        public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; } = null!;
        public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; } = null!;
        public virtual DbSet<NhanVien> NhanViens { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;
        public virtual DbSet<Slide> Slides { get; set; } = null!;
        public virtual DbSet<ThongSo> ThongSos { get; set; } = null!;
        public virtual DbSet<TinTuc> TinTucs { get; set; } = null!;
        public virtual DbSet<ViTechStore> ViTechStores { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DINHDIEMIT;Initial Catalog=TechStore;Integrated Security=True;Trust Server Certificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<About>(entity =>
            {
                entity.ToTable("About");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.GioiThieu)
                    .HasColumnType("ntext")
                    .HasColumnName("gioiThieu");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<AnhSanPham>(entity =>
            {
                entity.ToTable("AnhSanPham");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.AnhSanPhams)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_AnhSP_SanPham_id_sanphamId");
            });

            modelBuilder.Entity<AnhTinTuc>(entity =>
            {
                entity.ToTable("AnhTinTuc");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.TinTucId).HasColumnName("tinTuc_id");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.TinTuc)
                    .WithMany(p => p.AnhTinTucs)
                    .HasForeignKey(d => d.TinTucId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_AnhTinTuc_TinTuc_id_tintucid");
            });

            modelBuilder.Entity<BinhLuanTinTuc>(entity =>
            {
                entity.ToTable("BinhLuanTinTuc");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.NoiDung)
                    .HasColumnType("ntext")
                    .HasColumnName("noiDung");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserAdminId).HasColumnName("userAdmin_id");

                entity.Property(e => e.UserClientId).HasColumnName("userClient_id");

                entity.HasOne(d => d.UserAdmin)
                    .WithMany(p => p.BinhLuanTinTucs)
                    .HasForeignKey(d => d.UserAdminId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhanVien_BinhLuan_id_userAdmin");

                entity.HasOne(d => d.UserClient)
                    .WithMany(p => p.BinhLuanTinTucs)
                    .HasForeignKey(d => d.UserClientId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_KhachHang_id_userClient");
            });

            modelBuilder.Entity<ChiTietHoaDonNhap>(entity =>
            {
                entity.ToTable("ChiTietHoaDonNhap");

                entity.Property(e => e.GiaNhap)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("giaNhap");

                entity.Property(e => e.HoaDonNhapId).HasColumnName("hoaDonNhap_id");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.SoLuong).HasColumnName("soLuong");

                entity.Property(e => e.ThanhTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("thanhTien");

                entity.HasOne(d => d.HoaDonNhap)
                    .WithMany(p => p.ChiTietHoaDonNhaps)
                    .HasForeignKey(d => d.HoaDonNhapId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HoaDonNhap_ChiThietHDN_id_hoaDonNhapid");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ChiTietHoaDonNhaps)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SanPham_ChiTietHDX_id_sanphamid");
            });

            modelBuilder.Entity<ChiTietHoaDonXuat>(entity =>
            {
                entity.ToTable("ChiTietHoaDonXuat");

                entity.Property(e => e.GiaBan)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("giaBan");

                entity.Property(e => e.HoaDonXuatId).HasColumnName("hoaDonXuat_id");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.SoLuong)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("soLuong");

                entity.Property(e => e.ThanhTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("thanhTien");

                entity.HasOne(d => d.HoaDonXuat)
                    .WithMany(p => p.ChiTietHoaDonXuats)
                    .HasForeignKey(d => d.HoaDonXuatId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HoaDonXuat_ChiTietHDX_id_hoadonxuatid");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ChiTietHoaDonXuats)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SanPham_id_sanphamId");
            });

            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.ToTable("ChucVu");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenChucVu)
                    .HasMaxLength(255)
                    .HasColumnName("tenChucVu");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contact");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Duong)
                    .HasMaxLength(255)
                    .HasColumnName("duong");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Map)
                    .HasMaxLength(255)
                    .HasColumnName("map");

                entity.Property(e => e.QuanHuyen)
                    .HasMaxLength(255)
                    .HasColumnName("quanHuyen");

                entity.Property(e => e.SoDienThoai).HasColumnName("soDienThoai");

                entity.Property(e => e.ThonXom)
                    .HasMaxLength(255)
                    .HasColumnName("thonXom");

                entity.Property(e => e.TinhThanhPho)
                    .HasMaxLength(255)
                    .HasColumnName("tinhThanhPho");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.XaPhuong)
                    .HasMaxLength(255)
                    .HasColumnName("xaPhuong");
            });

            modelBuilder.Entity<DanhMucTinTuc>(entity =>
            {
                entity.ToTable("DanhMucTinTuc");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenDanhMuc)
                    .HasMaxLength(255)
                    .HasColumnName("tenDanhMuc");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<FeedBack>(entity =>
            {
                entity.ToTable("FeedBack");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.NoiDung)
                    .HasColumnType("ntext")
                    .HasColumnName("noiDung");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.FeedBacks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FeedBack_KhachHang_id_userid");
            });

            modelBuilder.Entity<HangSanPham>(entity =>
            {
                entity.ToTable("HangSanPham");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenHang)
                    .HasMaxLength(255)
                    .HasColumnName("tenHang");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<HoaDonNhap>(entity =>
            {
                entity.ToTable("HoaDonNhap");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NhaCungCapId).HasColumnName("nhaCungCap_id");

                entity.Property(e => e.TongTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("tongTien");

                entity.Property(e => e.TrangThaiThanhToan)
                    .HasMaxLength(255)
                    .HasColumnName("trangThaiThanhToan");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.NhaCungCap)
                    .WithMany(p => p.HoaDonNhaps)
                    .HasForeignKey(d => d.NhaCungCapId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhaCungCap_HoaDonNhap_id_nhacungcapid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HoaDonNhaps)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HDN_NhanVien_id_userid");
            });

            modelBuilder.Entity<HoaDonXuat>(entity =>
            {
                entity.ToTable("HoaDonXuat");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("ntext")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.GhiChu)
                    .HasColumnType("ntext")
                    .HasColumnName("ghiChu");

                entity.Property(e => e.GiamGia)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("giamGia");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.SoDienThoai).HasColumnName("soDienThoai");

                entity.Property(e => e.TongTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("tongTien");

                entity.Property(e => e.TrangThaiDonHang).HasColumnName("trangThaiDonHang");

                entity.Property(e => e.TrangThaiThanhToan).HasColumnName("trangThaiThanhToan");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HoaDonXuats)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HDX_NhanVien_id_userid");
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.ToTable("KhachHang");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("ntext")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.GioiTinh)
                    .HasMaxLength(10)
                    .HasColumnName("gioiTinh");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.NgaySinh)
                    .HasColumnType("date")
                    .HasColumnName("ngaySinh");

                entity.Property(e => e.PassWord)
                    .HasMaxLength(100)
                    .HasColumnName("passWord");

                entity.Property(e => e.SoDienThoai).HasColumnName("soDienThoai");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<LichSuGiaoDich>(entity =>
            {
                entity.ToTable("LichSuGiaoDich");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SoDuTruocDo)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("soDuTruocDo");

                entity.Property(e => e.SoTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("soTien");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.ViTechStoreId).HasColumnName("viTechStore_id");

                entity.HasOne(d => d.ViTechStore)
                    .WithMany(p => p.LichSuGiaoDiches)
                    .HasForeignKey(d => d.ViTechStoreId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ViTechStore_LichSuGiaoDich_id_viTechStore");
            });

            modelBuilder.Entity<LoaiSanPham>(entity =>
            {
                entity.ToTable("LoaiSanPham");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenLoai)
                    .HasMaxLength(255)
                    .HasColumnName("tenLoai");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<NhaCungCap>(entity =>
            {
                entity.ToTable("NhaCungCap");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("ntext")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.SoDienThoai).HasColumnName("soDienThoai");

                entity.Property(e => e.TenNhaCC)
                    .HasMaxLength(255)
                    .HasColumnName("tenNhaCC");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<NhanVien>(entity =>
            {
                entity.ToTable("NhanVien");

                entity.Property(e => e.Avatar)
                    .HasMaxLength(255)
                    .HasColumnName("avatar");

                entity.Property(e => e.ChucVuId).HasColumnName("chucVu_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiaChi)
                    .HasColumnType("ntext")
                    .HasColumnName("diaChi");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.GioiTinh)
                    .HasMaxLength(10)
                    .HasColumnName("gioiTinh");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.NgaySinh)
                    .HasColumnType("date")
                    .HasColumnName("ngaySinh");

                entity.Property(e => e.NgayVaoLam)
                    .HasColumnType("date")
                    .HasColumnName("ngayVaoLam");

                entity.Property(e => e.PassWord)
                    .HasMaxLength(100)
                    .HasColumnName("passWord");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.SoDienThoai).HasColumnName("soDienThoai");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.ChucVu)
                    .WithMany(p => p.NhanViens)
                    .HasForeignKey(d => d.ChucVuId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ChucVu_NhanVien_id_chucvuid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.NhanViens)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhanVien_Role");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TenRole)
                    .HasMaxLength(255)
                    .HasColumnName("tenRole");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.ToTable("SanPham");

                entity.Property(e => e.BaoHang)
                    .HasMaxLength(255)
                    .HasColumnName("baoHang");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.GiaBan)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("giaBan")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.GiamGia)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("giamGia")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.HangSanPhamId).HasColumnName("hangSanPham_id");

                entity.Property(e => e.LoaiSanPhamId).HasColumnName("loaiSanPham_id");

                entity.Property(e => e.MoTa)
                    .HasColumnType("ntext")
                    .HasColumnName("moTa");

                entity.Property(e => e.SoLuongTon)
                    .HasColumnName("soLuongTon")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.TenSanPham)
                    .HasMaxLength(255)
                    .HasColumnName("tenSanPham");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.HangSanPham)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.HangSanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_HangSP_SanPham_id_hangspid");

                entity.HasOne(d => d.LoaiSanPham)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.LoaiSanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_LoaiSP_SanPham_id_loaispid");
            });

            modelBuilder.Entity<Slide>(entity =>
            {
                entity.ToTable("Slide");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.Link)
                    .HasMaxLength(255)
                    .HasColumnName("link");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            modelBuilder.Entity<ThongSo>(entity =>
            {
                entity.ToTable("ThongSo");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.MoTa)
                    .HasMaxLength(255)
                    .HasColumnName("moTa");

                entity.Property(e => e.SanPhamId).HasColumnName("sanPham_id");

                entity.Property(e => e.TenThongSo)
                    .HasMaxLength(255)
                    .HasColumnName("tenThongSo");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.SanPham)
                    .WithMany(p => p.ThongSos)
                    .HasForeignKey(d => d.SanPhamId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ThongSo_SanPham_id_sanphamid");
            });

            modelBuilder.Entity<TinTuc>(entity =>
            {
                entity.ToTable("TinTuc");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DanhMucId).HasColumnName("danhMuc_id");

                entity.Property(e => e.NoiDung)
                    .HasColumnType("ntext")
                    .HasColumnName("noiDung");

                entity.Property(e => e.TieuDe)
                    .HasMaxLength(255)
                    .HasColumnName("tieuDe");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.DanhMuc)
                    .WithMany(p => p.TinTucs)
                    .HasForeignKey(d => d.DanhMucId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_DanhMuc_TinTuc_id_danhmcuid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TinTucs)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NhanVien_TinTuc_id_userid");
            });

            modelBuilder.Entity<ViTechStore>(entity =>
            {
                entity.ToTable("ViTechStore");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.SoTien)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("soTien");

                entity.Property(e => e.TrangThai).HasColumnName("trangThai");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ViTechStores)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ViTien_KhachHang_id_userid");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
