CREATE TABLE [About] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[gioiThieu] ntext NULL,
	[created_at] datetime NULL DEFAULT (getdate()),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [AnhSanPham] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[sanPham_id] INT NULL,
	[image] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate() ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [AnhTinTuc] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tinTuc_id] INT NULL,
	[image] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [BinhLuanTinTuc] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[userAdmin_id] INT NULL,
	[userClient_id] INT NULL,
	[hoTen] nvarchar ( 255 ) NULL,
	[email] nvarchar ( 255 ) NULL,
	[noiDung] ntext NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [ChiTietHoaDonNhap] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[hoaDonNhap_id] INT NULL,
	[sanPham_id] INT NULL,
	[giaNhap] DECIMAL ( 18, 2 ) NULL,
	[soLuong] INT NULL,
	[thanhTien] DECIMAL ( 18, 2 ) NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [ChiTietHoaDonXuat] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[hoaDonXuat_id] INT NULL,
	[sanPham_id] INT NULL,
	[giaBan] DECIMAL ( 18, 2 ) NULL,
	[soLuong] DECIMAL ( 18, 2 ) NULL,
	[thanhTien] DECIMAL ( 18, 2 ) NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [ChucVu] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenChucVu] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [Contact] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[map] nvarchar ( 255 ) NULL,
	[duong] nvarchar ( 255 ) NULL,
	[thonXom] nvarchar ( 255 ) NULL,
	[xaPhuong] nvarchar ( 255 ) NULL,
	[quanHuyen] nvarchar ( 255 ) NULL,
	[tinhThanhPho] nvarchar ( 255 ) NULL,
	[email] nvarchar ( 255 ) NULL,
	[soDienThoai] INT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [DanhMucTinTuc] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenDanhMuc] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [FeedBack] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[user_id] INT NULL,
	[hoTen] nvarchar ( 255 ) NULL,
	[email] nvarchar ( 255 ) NULL,
	[noiDung] ntext NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [HangSanPham] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenHang] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [HoaDonNhap] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[nhaCungCap_id] INT NULL,
	[user_id] INT NULL,
	[tongTien] DECIMAL ( 18, 2 ) NULL,
	[trangThaiThanhToan] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [HoaDonXuat] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[user_id] INT NULL,
	[hoTen] nvarchar ( 255 ) NULL,
	[soDienThoai] INT NULL,
	[email] nvarchar ( 255 ) NULL,
	[diaChi] ntext NULL,
	[ghiChu] ntext NULL,
	[giamGia] DECIMAL ( 18, 2 ) NULL,
	[tongTien] DECIMAL ( 18, 2 ) NULL,
	[trangThaiDonHang] INT NULL,
	[trangThaiThanhToan] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [KhachHang] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[email] nvarchar ( 255 ) NULL,
	[passWord] nvarchar ( 100 ) NULL,
	[hoTen] nvarchar ( 255 ) NULL,
	[soDienThoai] INT NULL,
	[diaChi] ntext NULL,
	[gioiTinh] nvarchar ( 10 ) NULL,
	[ngaySinh] DATE NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [LichSuGiaoDich] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[viTechStore_id] INT NULL,
	[soTien] DECIMAL ( 18, 2 ) NULL,
	[soDuTruocDo] DECIMAL ( 18, 2 ) NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [LoaiSanPham] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenLoai] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [NhaCungCap] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenNhaCC] nvarchar ( 255 ) NULL,
	[email] nvarchar ( 255 ) NULL,
	[soDienThoai] INT NULL,
	[diaChi] ntext NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [NhanVien] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[role_id] INT NULL,
	[email] nvarchar ( 255 ) NULL,
	[passWord] nvarchar ( 100 ) NULL,
	[avatar] nvarchar ( 255 ) NULL,
	[hoTen] nvarchar ( 255 ) NULL,
	[soDienThoai] INT NULL,
	[diaChi] ntext NULL,
	[gioiTinh] nvarchar ( 10 ) NULL,
	[ngaySinh] DATE NULL,
	[ngayVaoLam] DATE NULL,
	[chucVu_id] INT NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [Role] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenRole] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [SanPham] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[tenSanPham] nvarchar ( 255 ) NULL,
	[giaBan] DECIMAL ( 18, 2 ) NULL CONSTRAINT [DF_SanPham_giaBan] DEFAULT ( ( 0 ) ),
	[giamGia] DECIMAL ( 18, 2 ) NULL CONSTRAINT [DF_SanPham_giamGia] DEFAULT ( ( 0 ) ),
	[soLuongTon] INT NULL CONSTRAINT [DF_SanPham_soLuongTon] DEFAULT ( ( 0 ) ),
	[baoHang] nvarchar ( 255 ) NULL,
	[moTa] ntext NULL,
	[loaiSanPham_id] INT NULL,
	[hangSanPham_id] INT NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [Slide] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[image] nvarchar ( 255 ) NULL,
	[link] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate() ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [ThongSo] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[sanPham_id] INT NULL,
	[tenThongSo] nvarchar ( 255 ) NULL,
	[moTa] nvarchar ( 255 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [TinTuc] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[user_id] INT NULL,
	[danhMuc_id] INT NULL,
	[tieuDe] nvarchar ( 255 ) NULL,
	[noiDung] ntext NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
CREATE TABLE [ViTechStore] (
	[Id] INT NOT NULL IDENTITY ( 1, 1 ),
	[user_id] INT NULL,
	[soTien] DECIMAL ( 18, 2 ) NULL,
	[trangThai] BIT NULL,
	[created_at] datetime NULL DEFAULT ( getdate( ) ),
	[updated_at] datetime NULL,
	PRIMARY KEY ( [Id] ) 
);
ALTER TABLE [AnhSanPham] ADD CONSTRAINT [FK_AnhSP_SanPham_id_sanphamId] FOREIGN KEY ( [sanPham_id] ) REFERENCES [SanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [AnhTinTuc] ADD CONSTRAINT [FK_AnhTinTuc_TinTuc_id_tintucid] FOREIGN KEY ( [tinTuc_id] ) REFERENCES [TinTuc] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [BinhLuanTinTuc] ADD CONSTRAINT [FK_KhachHang_id_userClient] FOREIGN KEY ( [userClient_id] ) REFERENCES [KhachHang] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [BinhLuanTinTuc] ADD CONSTRAINT [FK_NhanVien_BinhLuan_id_userAdmin] FOREIGN KEY ( [userAdmin_id] ) REFERENCES [NhanVien] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ChiTietHoaDonNhap] ADD CONSTRAINT [FK_HoaDonNhap_ChiThietHDN_id_hoaDonNhapid] FOREIGN KEY ( [hoaDonNhap_id] ) REFERENCES [HoaDonNhap] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ChiTietHoaDonNhap] ADD CONSTRAINT [FK_SanPham_ChiTietHDX_id_sanphamid] FOREIGN KEY ( [sanPham_id] ) REFERENCES [SanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ChiTietHoaDonXuat] ADD CONSTRAINT [FK_HoaDonXuat_ChiTietHDX_id_hoadonxuatid] FOREIGN KEY ( [hoaDonXuat_id] ) REFERENCES [HoaDonXuat] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ChiTietHoaDonXuat] ADD CONSTRAINT [FK_SanPham_id_sanphamId] FOREIGN KEY ( [sanPham_id] ) REFERENCES [SanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [FeedBack] ADD CONSTRAINT [FK_FeedBack_KhachHang_id_userid] FOREIGN KEY ( [user_id] ) REFERENCES [KhachHang] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [HoaDonNhap] ADD CONSTRAINT [FK_NhaCungCap_HoaDonNhap_id_nhacungcapid] FOREIGN KEY ( [nhaCungCap_id] ) REFERENCES [NhaCungCap] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [HoaDonNhap] ADD CONSTRAINT [FK_HDN_NhanVien_id_userid] FOREIGN KEY ( [user_id] ) REFERENCES [NhanVien] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [HoaDonXuat] ADD CONSTRAINT [FK_HDX_NhanVien_id_userid] FOREIGN KEY ( [user_id] ) REFERENCES [NhanVien] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [LichSuGiaoDich] ADD CONSTRAINT [FK_ViTechStore_LichSuGiaoDich_id_viTechStore] FOREIGN KEY ( [viTechStore_id] ) REFERENCES [ViTechStore] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [NhanVien] ADD CONSTRAINT [FK_ChucVu_NhanVien_id_chucvuid] FOREIGN KEY ( [chucVu_id] ) REFERENCES [ChucVu] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [NhanVien] ADD CONSTRAINT [FK_NhanVien_Role] FOREIGN KEY ( [role_id] ) REFERENCES [Role] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [SanPham] ADD CONSTRAINT [FK_LoaiSP_SanPham_id_loaispid] FOREIGN KEY ( [loaiSanPham_id] ) REFERENCES [LoaiSanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [SanPham] ADD CONSTRAINT [FK_HangSP_SanPham_id_hangspid] FOREIGN KEY ( [hangSanPham_id] ) REFERENCES [HangSanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ThongSo] ADD CONSTRAINT [FK_ThongSo_SanPham_id_sanphamid] FOREIGN KEY ( [sanPham_id] ) REFERENCES [SanPham] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [TinTuc] ADD CONSTRAINT [FK_DanhMuc_TinTuc_id_danhmcuid] FOREIGN KEY ( [danhMuc_id] ) REFERENCES [DanhMucTinTuc] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [TinTuc] ADD CONSTRAINT [FK_NhanVien_TinTuc_id_userid] FOREIGN KEY ( [user_id] ) REFERENCES [NhanVien] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE [ViTechStore] ADD CONSTRAINT [FK_ViTien_KhachHang_id_userid] FOREIGN KEY ( [user_id] ) REFERENCES [KhachHang] ( [Id] ) ON DELETE CASCADE ON UPDATE CASCADE;