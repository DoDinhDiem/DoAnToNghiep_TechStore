export interface IHoaDon {
    id?: number
    userId?: number
    hoTen?: string
    soDienThoai?: number
    email?: string
    diaChi?: string
    ghiChu?: string
    giamGia?: number
    tongTien?: number
    trangThaiDonHang?: number
    trangThaiThanhToan?: boolean
    phuongThucGiaoDich?: string
    chiTietHoaDonXuats?:
        | {
              sanPhamId?: number
              soLuong?: number
              giaBan?: number
              thanhTien?: number
          }[]
        | null
}
