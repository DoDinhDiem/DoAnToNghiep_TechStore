export interface ITinTuc {
    id?: number
    userId?: number
    danhMucId?: number
    tieuDe?: string
    noiDung?: string
    trangThai?: boolean
    anhTinTucs?:
        | {
              image?: string
              trangThai?: boolean
          }[]
        | null
}
