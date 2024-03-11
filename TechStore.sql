
CREATE TABLE About(
	Id int IDENTITY(1,1) PRIMARY KEY,
	gioiThieu ntext NULL,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE AnhSanPham(
	Id int IDENTITY(1,1) PRIMARY KEY,
	sanPham_id int NULL,
	image nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE AnhTinTuc(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tinTuc_id int NULL,
	image nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE BinhLuanTinTuc(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tinTuc_Id int NULL,
	khachHang_Id int NULL,
	hoTen nvarchar(255) NULL,
	email nvarchar(255) NULL,
	noiDung ntext NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE ChiTietHoaDonNhap(
	Id int IDENTITY(1,1) PRIMARY KEY,
	hoaDonNhap_id int NULL,
	sanPham_id int NULL,
	giaNhap decimal(18, 2) DEFAULT 0,
	soLuong int DEFAULT 0,
	thanhTien decimal(18, 2) DEFAULT 0
)
GO

CREATE TABLE ChiTietHoaDonXuat(
	Id int IDENTITY(1,1) PRIMARY KEY,
	hoaDonXuat_id int NULL,
	sanPham_id int NULL,
	giaBan decimal(18, 2) DEFAULT 0,
	soLuong int DEFAULT 0,
	thanhTien decimal(18, 2) DEFAULT 0,
)
GO

CREATE TABLE ChucVu(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenChucVu nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE Contact(
	Id int IDENTITY(1,1) PRIMARY KEY,
	map ntext NULL,
	duong nvarchar(255) NULL,
	thonXom nvarchar(255) NULL,
	xaPhuong nvarchar(255) NULL,
	quanHuyen nvarchar(255) NULL,
	tinhThanhPho nvarchar(255) NULL,
	email nvarchar(255) NULL,
	soDienThoai int NULL,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE DanhMucTinTuc(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenDanhMuc nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE FeedBack(
	Id int IDENTITY(1,1) PRIMARY KEY,
	user_id int NULL,
	hoTen nvarchar(255) NULL,
	email nvarchar(255) NULL,
	noiDung ntext NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE HangSanPham(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenHang nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE HoaDonNhap(
	Id int IDENTITY(1,1) PRIMARY KEY,
	nhaCungCap_id int NULL,
	user_id int NULL,
	tongTien decimal(18, 2) DEFAULT 0,
	trangThaiThanhToan nvarchar(255) NULL,
	created_at datetime DEFAULT getdate()
)
GO

CREATE TABLE HoaDonXuat(
	Id int IDENTITY(1,1) PRIMARY KEY,
	user_id int NULL,
	hoTen nvarchar(255) NULL,
	soDienThoai int NULL,
	email nvarchar(255) NULL,
	diaChi ntext NULL,
	ghiChu ntext NULL,
	giamGia decimal(18, 2) DEFAULT 0,
	tongTien decimal(18, 2) DEFAULT 0,
	trangThaiDonHang int NULL,
	trangThaiThanhToan bit DEFAULT 0,
	phuongThucGiaoDich nvarchar(255) NULL,
	created_at datetime DEFAULT getdate()
)
GO

CREATE TABLE KhachHang(
	Id int IDENTITY(1,1) PRIMARY KEY,
	email nvarchar(255) NULL,
	passWord nvarchar(100) NULL,
	hoTen nvarchar(255) NULL,
	soDienThoai int NULL,
	diaChi ntext NULL,
	gioiTinh nvarchar(10) NULL,
	ngaySinh date NULL,
	token nvarchar(max) NULL,
	refreshToken nvarchar(max) NULL,
	RefreshTokenExpiryTime datetime2(7) NULL,
	veryOtp int NULL,
	veryDate datetime2(7) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE LichSuGiaoDich(
	Id int IDENTITY(1,1) PRIMARY KEY,
	khachHang_Id int NULL,
	hoaDon_Id int NULL,
	soTien decimal(18, 2) DEFAULT 0,
	nganHang nvarchar(255) NULL,
	loaiThe nvarchar(255) NULL,
	created_at datetime DEFAULT getdate()
)
GO

CREATE TABLE LoaiSanPham(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenLoai nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE MaGiamActive(
	id int IDENTITY(1,1) PRIMARY KEY,
	maGiamGia_Id int NULL,
	khachHang_Id int NULL,
	created_At datetime DEFAULT getdate(),
)
GO

CREATE TABLE MaGiamGia(
	id int IDENTITY(1,1) PRIMARY KEY,
	maGiamGia varchar(255) NULL,
	soTienGiam decimal(18, 2) NULL,
	moTa ntext NULL,
	soLuong int DEFAULT 0,
	hanSuDung date NULL,
	trangThai bit DEFAULT 0,
	created_At datetime DEFAULT getdate()
)
GO

CREATE TABLE NhaCungCap(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenNhaCC nvarchar(255) NULL,
	email nvarchar(255) NULL,
	soDienThoai int NULL,
	diaChi ntext NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE NhanVien(
	Id int IDENTITY(1,1) PRIMARY KEY,
	role_id int NULL,
	chucVu_id int NULL,
	email nvarchar(255) NULL,
	passWord nvarchar(100) NULL,
	avatar nvarchar(255) NULL,
	hoTen nvarchar(255) NULL,
	soDienThoai int NULL,
	diaChi ntext NULL,
	gioiTinh nvarchar(10) NULL,
	ngaySinh date NULL,
	ngayVaoLam date NULL,
	token nvarchar(max) NULL,
	refreshToken nvarchar(255) NULL,
	refreshTokenExpiryTime datetime2(7) NULL,
	passTrue bit DEFAULT 0,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE PhanHoiBinhLuanTinTuc(
	id int IDENTITY(1,1) PRIMARY KEY,
	binhLuan_Id int NULL,
	nhanVien_Id int NULL,
	khachHang_Id int NULL,
	tinTuc_Id int NULL,
	hoTen nvarchar(255) NULL,
	noiDung ntext NULL,
	trangThai bit DEFAULT 0,
	created_At datetime DEFAULT getdate(),
)
GO

CREATE TABLE Role(
	Id int IDENTITY(1,1) PRIMARY KEY,
	tenRole nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE SanPham(
	Id int IDENTITY(1,1) PRIMARY KEY,
	loaiSanPham_id int NULL,
	hangSanPham_id int NULL,
	tenSanPham nvarchar(255) NULL,
	giaBan decimal(18, 2) DEFAULT 0,
	giamGia decimal(18, 2) DEFAULT 0,
	soLuongTon int DEFAULT 0,
	baoHang nvarchar(255) NULL,
	moTa ntext NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE Slide(
	Id int IDENTITY(1,1) PRIMARY KEY,
	image nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

CREATE TABLE ThongSo(
	Id int IDENTITY(1,1) PRIMARY KEY,
	sanPham_id int NULL,
	tenThongSo nvarchar(255) NULL,
	moTa nvarchar(255) NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL,
)
GO

CREATE TABLE TinTuc(
	Id int IDENTITY(1,1) PRIMARY KEY,
	user_id int NULL,
	danhMuc_id int NULL,
	tieuDe nvarchar(255) NULL,
	noiDung ntext NULL,
	trangThai bit DEFAULT 0,
	created_at datetime DEFAULT getdate(),
	updated_at datetime NULL
)
GO

ALTER TABLE AnhSanPham  WITH CHECK ADD FOREIGN KEY(sanPham_id) REFERENCES SanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE AnhTinTuc  WITH CHECK ADD FOREIGN KEY(tinTuc_id) REFERENCES TinTuc (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE BinhLuanTinTuc  WITH CHECK ADD FOREIGN KEY(khachHang_Id) REFERENCES KhachHang (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE BinhLuanTinTuc  WITH CHECK ADD FOREIGN KEY(tinTuc_Id) REFERENCES TinTuc (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE ChiTietHoaDonNhap  WITH CHECK ADD FOREIGN KEY(hoaDonNhap_id) REFERENCES HoaDonNhap (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE ChiTietHoaDonNhap  WITH CHECK ADD FOREIGN KEY(sanPham_id) REFERENCES SanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE ChiTietHoaDonXuat  WITH CHECK ADD FOREIGN KEY(hoaDonXuat_id) REFERENCES HoaDonXuat (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE ChiTietHoaDonXuat  WITH CHECK ADD FOREIGN KEY(sanPham_id) REFERENCES SanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE FeedBack  WITH CHECK ADD FOREIGN KEY(user_id) REFERENCES KhachHang (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE HoaDonNhap  WITH CHECK ADD FOREIGN KEY(user_id) REFERENCES NhanVien (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE HoaDonNhap  WITH CHECK ADD FOREIGN KEY(nhaCungCap_id) REFERENCES NhaCungCap (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE HoaDonXuat  WITH CHECK ADD FOREIGN KEY(user_id) REFERENCES KhachHang (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE LichSuGiaoDich  WITH CHECK ADD FOREIGN KEY(hoaDon_Id) REFERENCES HoaDonXuat (Id)
GO

ALTER TABLE LichSuGiaoDich  WITH NOCHECK ADD FOREIGN KEY(khachHang_Id) REFERENCES KhachHang (Id)
GO

ALTER TABLE MaGiamActive  WITH CHECK ADD FOREIGN KEY(maGiamGia_Id) REFERENCES MaGiamGia (id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE MaGiamActive  WITH CHECK ADD FOREIGN KEY(khachHang_Id) REFERENCES KhachHang (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE NhanVien  WITH CHECK ADD FOREIGN KEY(chucVu_id) REFERENCES ChucVu (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE NhanVien  WITH CHECK ADD FOREIGN KEY(role_id) REFERENCES Role (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE PhanHoiBinhLuanTinTuc  WITH CHECK ADD FOREIGN KEY(binhLuan_Id) REFERENCES BinhLuanTinTuc (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE PhanHoiBinhLuanTinTuc  WITH CHECK ADD FOREIGN KEY(tinTuc_Id)REFERENCES TinTuc (Id)
GO

ALTER TABLE SanPham  WITH CHECK ADD FOREIGN KEY(hangSanPham_id) REFERENCES HangSanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE SanPham  WITH CHECK ADD FOREIGN KEY(loaiSanPham_id) REFERENCES LoaiSanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE ThongSo  WITH CHECK ADD FOREIGN KEY(sanPham_id) REFERENCES SanPham (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE TinTuc  WITH CHECK ADD FOREIGN KEY(danhMuc_id) REFERENCES DanhMucTinTuc (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE TinTuc  WITH CHECK ADD FOREIGN KEY(user_id) REFERENCES NhanVien (Id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

CREATE TRIGGER trg_About_update
ON About
FOR UPDATE
AS
BEGIN
    UPDATE About
    SET updated_at = GETDATE()
    FROM About AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_AnhSanPham_Update
ON AnhSanPham
FOR UPDATE
AS
BEGIN
    UPDATE AnhSanPham
    SET updated_at = GETDATE()
    FROM AnhSanPham AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_AnhTinTuc_Update
ON AnhTinTuc
FOR UPDATE
AS
BEGIN
    UPDATE AnhTinTuc
    SET updated_at = GETDATE()
    FROM AnhTinTuc AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_BinhLuan_Update
ON BinhLuanTinTuc
FOR UPDATE
AS
BEGIN
    UPDATE BinhLuanTinTuc
    SET updated_at = GETDATE()
    FROM BinhLuanTinTuc AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_ChucVu_Update
ON ChucVu
FOR UPDATE
AS
BEGIN
    UPDATE ChucVu
    SET updated_at = GETDATE()
    FROM ChucVu AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_Contact_Update
ON Contact
FOR UPDATE
AS
BEGIN
    UPDATE Contact
    SET updated_at = GETDATE()
    FROM Contact AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_DanhMuc_Update
ON DanhMucTinTuc
FOR UPDATE
AS
BEGIN
    UPDATE DanhMucTinTuc
    SET updated_at = GETDATE()
    FROM DanhMucTinTuc AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_FeedBack_Update
ON FeedBack
FOR UPDATE
AS
BEGIN
    UPDATE FeedBack
    SET updated_at = GETDATE()
    FROM FeedBack AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_HangSanPham_Update
ON HangSanPham
FOR UPDATE
AS
BEGIN
    UPDATE HangSanPham
    SET updated_at = GETDATE()
    FROM HangSanPham AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_KhachHang_Update
ON KhachHang
FOR UPDATE
AS
BEGIN
    UPDATE KhachHang
    SET updated_at = GETDATE()
    FROM KhachHang AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO


CREATE TRIGGER trg_LoaiSanPham_Update
ON LoaiSanPham
FOR UPDATE
AS
BEGIN
    UPDATE LoaiSanPham
    SET updated_at = GETDATE()
    FROM LoaiSanPham AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_NhaCungCap
ON NhaCungCap
FOR UPDATE
AS
BEGIN
    UPDATE NhaCungCap
    SET updated_at = GETDATE()
    FROM NhaCungCap AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_NhanVien_Update
ON NhanVien
FOR UPDATE
AS
BEGIN
    UPDATE NhanVien
    SET updated_at = GETDATE()
    FROM NhanVien AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_Role_Update
ON Role
FOR UPDATE
AS
BEGIN
    UPDATE Role
    SET updated_at = GETDATE()
    FROM Role AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_SanPham_Update
ON SanPham
FOR UPDATE
AS
BEGIN
    UPDATE SanPham
    SET updated_at = GETDATE()
    FROM SanPham AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_Slide_Update
ON Slide
FOR UPDATE
AS
BEGIN
    UPDATE Slide
    SET updated_at = GETDATE()
    FROM Slide AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_ThongSo_Update
ON ThongSo
FOR UPDATE
AS
BEGIN
    UPDATE ThongSo
    SET updated_at = GETDATE()
    FROM ThongSo AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO

CREATE TRIGGER trg_TinTuc_Update
ON TinTuc
FOR UPDATE
AS
BEGIN
    UPDATE TinTuc
    SET updated_at = GETDATE()
    FROM TinTuc AS p
    INNER JOIN inserted AS i ON p.id = i.id;
END;
GO