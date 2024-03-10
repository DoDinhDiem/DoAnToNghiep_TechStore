CREATE TABLE [About] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [gioiThieu] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__About__3214EC0763038461] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [About] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_About_update]
ON [].[About]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[About]
    SET updated_at = GETDATE()
    FROM [dbo].[About] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [AnhSanPham] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [sanPham_id] int  NULL,
  [image] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__AnhSanPh__3214EC0722B0D18D] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [AnhSanPham] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_AnhSanPham_Update]
ON [].[AnhSanPham]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[AnhSanPham]
    SET updated_at = GETDATE()
    FROM [dbo].[AnhSanPham] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [AnhTinTuc] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tinTuc_id] int  NULL,
  [image] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__AnhTinTu__3214EC073412C864] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [AnhTinTuc] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_AnhTinTuc_Update]
ON [].[AnhTinTuc]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[AnhTinTuc]
    SET updated_at = GETDATE()
    FROM [dbo].[AnhTinTuc] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [BinhLuanTinTuc] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [userClient] int  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [noiDung] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  [tinTuc_Id] int  NULL,
  CONSTRAINT [PK__BinhLuan__3214EC07BE72DFFF] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [BinhLuanTinTuc] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_BinhLuan_Update]
ON [].[BinhLuanTinTuc]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[BinhLuanTinTuc]
    SET updated_at = GETDATE()
    FROM [dbo].[BinhLuanTinTuc] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [ChiTietHoaDonNhap] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [hoaDonNhap_id] int  NULL,
  [sanPham_id] int  NULL,
  [giaNhap] decimal(18,2)  NULL,
  [soLuong] int  NULL,
  [thanhTien] decimal(18,2)  NULL,
  CONSTRAINT [PK__ChiTietH__3214EC07D5CB2DE4] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [ChiTietHoaDonNhap] SET (LOCK_ESCALATION = TABLE)
GO

CREATE TABLE [ChiTietHoaDonXuat] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [hoaDonXuat_id] int  NULL,
  [sanPham_id] int  NULL,
  [giaBan] decimal(18,2)  NULL,
  [soLuong] decimal(18,2)  NULL,
  [thanhTien] decimal(18,2)  NULL,
  CONSTRAINT [PK__ChiTietH__3214EC07A0CDDABF] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [ChiTietHoaDonXuat] SET (LOCK_ESCALATION = TABLE)
GO

CREATE TABLE [ChucVu] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenChucVu] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__ChucVu__3214EC075A5E8AFB] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [ChucVu] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_ChucVu_Update]
ON [].[ChucVu]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[ChucVu]
    SET updated_at = GETDATE()
    FROM [dbo].[ChucVu] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [Contact] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [map] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [duong] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [thonXom] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [xaPhuong] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [quanHuyen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [tinhThanhPho] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [soDienThoai] int  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__Contact__3214EC07D9E96779] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [Contact] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_Contact_Update]
ON [].[Contact]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[Contact]
    SET updated_at = GETDATE()
    FROM [dbo].[Contact] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [DanhMucTinTuc] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenDanhMuc] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__DanhMucT__3214EC070ADC670A] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [DanhMucTinTuc] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_DanhMuc_Update]
ON [].[DanhMucTinTuc]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[DanhMucTinTuc]
    SET updated_at = GETDATE()
    FROM [dbo].[DanhMucTinTuc] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [FeedBack] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [user_id] int  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [noiDung] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__FeedBack__3214EC07B0645CD4] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [FeedBack] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_FeedBack_Update]
ON [].[FeedBack]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[FeedBack]
    SET updated_at = GETDATE()
    FROM [dbo].[FeedBack] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [HangSanPham] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenHang] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__HangSanP__3214EC07DDDA23C4] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [HangSanPham] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_HangSanPham_Update]
ON [].[HangSanPham]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[HangSanPham]
    SET updated_at = GETDATE()
    FROM [dbo].[HangSanPham] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [HoaDonNhap] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [nhaCungCap_id] int  NULL,
  [user_id] int  NULL,
  [tongTien] decimal(18,2)  NULL,
  [trangThaiThanhToan] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  CONSTRAINT [PK__HoaDonNh__3214EC074D972D82] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [HoaDonNhap] SET (LOCK_ESCALATION = TABLE)
GO

CREATE TABLE [HoaDonXuat] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [user_id] int  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [soDienThoai] int  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [diaChi] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [ghiChu] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [giamGia] decimal(18,2)  NULL,
  [tongTien] decimal(18,2)  NULL,
  [trangThaiDonHang] int  NULL,
  [trangThaiThanhToan] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  CONSTRAINT [PK__HoaDonXu__3214EC072DF61E4E] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [HoaDonXuat] SET (LOCK_ESCALATION = TABLE)
GO

CREATE TABLE [KhachHang] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [passWord] nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [soDienThoai] int  NULL,
  [diaChi] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [gioiTinh] nvarchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [ngaySinh] date  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__KhachHan__3214EC07BB426E04] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [KhachHang] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_KhachHang_Update]
ON [].[KhachHang]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[KhachHang]
    SET updated_at = GETDATE()
    FROM [dbo].[KhachHang] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [LichSuGiaoDich] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [viTechStore_id] int  NULL,
  [soTien] decimal(18,2)  NULL,
  [soDuTruocDo] decimal(18,2)  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__LichSuGi__3214EC073CD8DBF4] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [LichSuGiaoDich] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_LichSuGiaoDich_Update]
ON [].[LichSuGiaoDich]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[LichSuGiaoDich]
    SET updated_at = GETDATE()
    FROM [dbo].[LichSuGiaoDich] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [LoaiSanPham] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenLoai] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__LoaiSanP__3214EC07B62E1D6F] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [LoaiSanPham] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_LoaiSanPham_Update]
ON [].[LoaiSanPham]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[LoaiSanPham]
    SET updated_at = GETDATE()
    FROM [dbo].[LoaiSanPham] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [NhaCungCap] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenNhaCC] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [soDienThoai] int  NULL,
  [diaChi] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__NhaCungC__3214EC07A08C5B56] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [NhaCungCap] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_NhaCungCap]
ON [].[NhaCungCap]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[NhaCungCap]
    SET updated_at = GETDATE()
    FROM [dbo].[NhaCungCap] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [NhanVien] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [role_id] int  NULL,
  [email] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [passWord] nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [avatar] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [soDienThoai] int  NULL,
  [diaChi] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [gioiTinh] nvarchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [ngaySinh] date  NULL,
  [ngayVaoLam] date  NULL,
  [chucVu_id] int  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__NhanVien__3214EC07831781A0] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [NhanVien] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_NhanVien_Update]
ON [].[NhanVien]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[NhanVien]
    SET updated_at = GETDATE()
    FROM [dbo].[NhanVien] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [PhanHoiBinhLuanTinTuc] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [binhLuan_Id] int  NULL,
  [hoTen] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [noiDung] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_At] datetime DEFAULT getdate() NOT NULL,
  CONSTRAINT [PK__PhanHoiB__3213E83F7CA64FC6] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [PhanHoiBinhLuanTinTuc] SET (LOCK_ESCALATION = TABLE)
GO

CREATE TABLE [Role] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenRole] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__Role__3214EC075BA4BCB5] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [Role] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_Role_Update]
ON [].[Role]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[Role]
    SET updated_at = GETDATE()
    FROM [dbo].[Role] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [SanPham] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [tenSanPham] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [giaBan] decimal(18,2) DEFAULT 0 NULL,
  [giamGia] decimal(18,2) DEFAULT 0 NULL,
  [soLuongTon] int DEFAULT 0 NULL,
  [baoHang] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [moTa] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [loaiSanPham_id] int  NULL,
  [hangSanPham_id] int  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__SanPham__3214EC073A116EAC] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [SanPham] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_SanPham_Update]
ON [].[SanPham]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[SanPham]
    SET updated_at = GETDATE()
    FROM [dbo].[SanPham] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [Slide] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [image] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [link] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__Slide__3214EC077853880A] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [Slide] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_Slide_Update]
ON [].[Slide]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[Slide]
    SET updated_at = GETDATE()
    FROM [dbo].[Slide] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [ThongSo] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [sanPham_id] int  NULL,
  [tenThongSo] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [moTa] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__ThongSo__3214EC07DCA042C3] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [ThongSo] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_ThongSo_Update]
ON [].[ThongSo]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[ThongSo]
    SET updated_at = GETDATE()
    FROM [dbo].[ThongSo] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [TinTuc] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [user_id] int  NULL,
  [danhMuc_id] int  NULL,
  [tieuDe] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [noiDung] ntext COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__TinTuc__3214EC0716A55A77] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [TinTuc] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_TinTuc_Update]
ON [].[TinTuc]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[TinTuc]
    SET updated_at = GETDATE()
    FROM [dbo].[TinTuc] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TABLE [ViTechStore] (
  [Id] int  IDENTITY(1,1) NOT NULL,
  [user_id] int  NULL,
  [soTien] decimal(18,2)  NULL,
  [trangThai] bit  NULL,
  [created_at] datetime DEFAULT getdate() NULL,
  [updated_at] datetime  NULL,
  CONSTRAINT [PK__ViTechSt__3214EC0781803A5C] PRIMARY KEY CLUSTERED ([Id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
)
GO
ALTER TABLE [ViTechStore] SET (LOCK_ESCALATION = TABLE)
GO
CREATE TRIGGER [trg_ViTechStore_Update]
ON [].[ViTechStore]
WITH EXECUTE AS CALLER
FOR UPDATE
AS
BEGIN
    UPDATE [dbo].[ViTechStore]
    SET updated_at = GETDATE()
    FROM [dbo].[ViTechStore] AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

ALTER TABLE [AnhSanPham] ADD CONSTRAINT [FK_AnhSP_SanPham_id_sanphamId] FOREIGN KEY ([sanPham_id]) REFERENCES [SanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [AnhTinTuc] ADD CONSTRAINT [FK_AnhTinTuc_TinTuc_id_tintucid] FOREIGN KEY ([tinTuc_id]) REFERENCES [TinTuc] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [BinhLuanTinTuc] ADD CONSTRAINT [FK_TinTuc_id_tintucid] FOREIGN KEY ([tinTuc_Id]) REFERENCES [TinTuc] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [BinhLuanTinTuc] ADD CONSTRAINT [FK_KhachHang_id_userClient] FOREIGN KEY ([userClient]) REFERENCES [KhachHang] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ChiTietHoaDonNhap] ADD CONSTRAINT [FK_SanPham_ChiTietHDX_id_sanphamid] FOREIGN KEY ([sanPham_id]) REFERENCES [SanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ChiTietHoaDonNhap] ADD CONSTRAINT [FK_HoaDonNhap_ChiThietHDN_id_hoaDonNhapid] FOREIGN KEY ([hoaDonNhap_id]) REFERENCES [HoaDonNhap] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ChiTietHoaDonXuat] ADD CONSTRAINT [FK_HoaDonXuat_ChiTietHDX_id_hoadonxuatid] FOREIGN KEY ([hoaDonXuat_id]) REFERENCES [HoaDonXuat] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ChiTietHoaDonXuat] ADD CONSTRAINT [FK_SanPham_id_sanphamId] FOREIGN KEY ([sanPham_id]) REFERENCES [SanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [FeedBack] ADD CONSTRAINT [FK_FeedBack_KhachHang_id_userid] FOREIGN KEY ([user_id]) REFERENCES [KhachHang] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [HoaDonNhap] ADD CONSTRAINT [FK_NhaCungCap_HoaDonNhap_id_nhacungcapid] FOREIGN KEY ([nhaCungCap_id]) REFERENCES [NhaCungCap] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [HoaDonNhap] ADD CONSTRAINT [FK_HDN_NhanVien_id_userid] FOREIGN KEY ([user_id]) REFERENCES [NhanVien] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [HoaDonXuat] ADD CONSTRAINT [FK_HDX_NhanVien_id_userid] FOREIGN KEY ([user_id]) REFERENCES [NhanVien] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [LichSuGiaoDich] ADD CONSTRAINT [FK_ViTechStore_LichSuGiaoDich_id_viTechStore] FOREIGN KEY ([viTechStore_id]) REFERENCES [ViTechStore] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [NhanVien] ADD CONSTRAINT [FK_ChucVu_NhanVien_id_chucvuid] FOREIGN KEY ([chucVu_id]) REFERENCES [ChucVu] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [NhanVien] ADD CONSTRAINT [FK_NhanVien_Role] FOREIGN KEY ([role_id]) REFERENCES [Role] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [PhanHoiBinhLuanTinTuc] ADD CONSTRAINT [FK_PhanHoiBinhLuan_id_binhluanid] FOREIGN KEY ([binhLuan_Id]) REFERENCES [BinhLuanTinTuc] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [SanPham] ADD CONSTRAINT [FK_LoaiSP_SanPham_id_loaispid] FOREIGN KEY ([loaiSanPham_id]) REFERENCES [LoaiSanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [SanPham] ADD CONSTRAINT [FK_HangSP_SanPham_id_hangspid] FOREIGN KEY ([hangSanPham_id]) REFERENCES [HangSanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ThongSo] ADD CONSTRAINT [FK_ThongSo_SanPham_id_sanphamid] FOREIGN KEY ([sanPham_id]) REFERENCES [SanPham] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [TinTuc] ADD CONSTRAINT [FK_DanhMuc_TinTuc_id_danhmcuid] FOREIGN KEY ([danhMuc_id]) REFERENCES [DanhMucTinTuc] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [TinTuc] ADD CONSTRAINT [FK_NhanVien_TinTuc_id_userid] FOREIGN KEY ([user_id]) REFERENCES [NhanVien] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
ALTER TABLE [ViTechStore] ADD CONSTRAINT [FK_ViTien_KhachHang_id_userid] FOREIGN KEY ([user_id]) REFERENCES [KhachHang] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

