export interface ISanPham {
    id?: number
    tenSanPham?: string
    giaBan?: number
    giamGia?: number
    soLuongTon?: number
    baoHang?: string
    moTa?: string
    loaiSanPhamId?: number
    hangSanPhamId?: number
    trangThai?: boolean
    anhSanPhams?:
        | {
              image?: string
              trangThai?: boolean
          }[]
        | null
    thongSos?:
        | {
              tenThongSo?: string
              moTa?: string
              trangThai?: boolean
          }[]
        | null
}
