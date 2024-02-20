export interface IHoaDonNhap {
    id?: number
    nhaCungCapId?: number
    userId?: number
    tongTien?: number
    trangThaiThanhToan?: string
    chiTietHoaDonNhaps?:
        | {
              sanPhamId?: number
              giaNhap?: number
              soLuong?: number
              thanhTien?: number
          }[]
        | null
}
