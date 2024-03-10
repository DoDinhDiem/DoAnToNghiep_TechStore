import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IHoaDonNhap } from 'src/app/Models/hoa-don-nhap'
import { AuthService } from 'src/app/Service/auth.service'
import { HoaDonNhapService } from 'src/app/Service/hoa-don-nhap.service'
import { NhaCungCapService } from 'src/app/Service/nha-cung-cap.service'
import { SanPhamService } from 'src/app/Service/san-pham.service'

@Component({
    selector: 'app-hoa-don-nhap',
    templateUrl: './hoa-don-nhap.component.html',
    styleUrls: ['./hoa-don-nhap.component.scss'],
    providers: [MessageService]
})
export class HoaDonNhapComponent {
    //title
    title = 'Hóa đơn nhập'

    //Khai báo true/false cho dialog
    visible: boolean = false
    visible_edit: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi hóa đơn nhâp
    hoadonnhap!: IHoaDonNhap
    hoadonnhapList: any

    nhacungcap: any[] = []
    sanpham: any[] = []

    //Gọi constructor
    constructor(
        private hoaDonNhapService: HoaDonNhapService,
        private nhacungcapService: NhaCungCapService,
        private sanphamService: SanPhamService,
        private messageService: MessageService,
        private auth: AuthService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.hoadonnhap = {}
        this.invoiceDetail = []
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.hoadonnhap = {}
    }

    //Đóng dialog edit
    closeDialogEdit() {
        this.visible_edit = false
    }

    //Gọi load hóa đơn nhâp
    loadData() {
        this.showSkeleton = true
        this.nhacungcapService.getAll().subscribe((data) => {
            this.nhacungcap = data.map((item) => ({
                id: item.id,
                name: item.tenNhaCC
            }))
        })
        this.sanphamService.getAll().subscribe((data) => {
            this.sanpham = data.map((item) => ({
                id: item.id,
                name: item.tenSanPham
            }))
        })
        setTimeout(() => {
            this.hoaDonNhapService.search(this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.hoadonnhapList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Gọi mở sửa dialog
    editModal(hoadonnhap: IHoaDonNhap) {
        this.hoaDonNhapService.getById(hoadonnhap.id).subscribe((data) => {
            this.hoadonnhap = data.hoaDon
            this.visible_edit = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.hoadonnhap.userId = this.auth.getIdFromToken()
        this.hoadonnhap.chiTietHoaDonNhaps = []
        for (let i = 0; i < this.invoiceDetail.length; i++) {
            const order = this.invoiceDetail[i]
            const soLuong: number = Number(order.soLuong)
            const giaNhap: number = Number(order.giaNhap)
            const chitiet = {
                sanPhamId: order.sanPhamId,
                soLuong: order.soLuong,
                giaNhap: order.giaNhap,
                thanhTien: soLuong * giaNhap
            }
            this.hoadonnhap.chiTietHoaDonNhaps.push(chitiet)
        }
        if (this.hoadonnhap.nhaCungCapId && this.hoadonnhap.id) {
            this.hoaDonNhapService.update(this.hoadonnhap).subscribe({
                next: (res) => {
                    this.loadData()
                    this.closeDialogEdit()
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                },
                error: (err) => {
                    this.loadData()
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                }
            })
        } else {
            this.hoaDonNhapService.create(this.hoadonnhap).subscribe({
                next: (res) => {
                    this.loadData()
                    this.closeDialog()
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                }
            })
        }
    }

    //Chi tiết hóa đơn
    hoadonDetail: any
    chiTietHoaDon: any
    nhaCungCap: any
    showDetail(hoadon: any) {
        this.hoaDonNhapService.getById(hoadon.id).subscribe((data) => {
            this.hoadonDetail = data.hoaDon
            this.nhaCungCap = data.nhaCC
            this.chiTietHoaDon = data.chiTiet
        })
    }
    /*
     *Chi tiết hóa đơn
     */
    invoiceDetail: any[] = []
    addRowInvoice() {
        this.invoiceDetail.push({
            sanPhamId: '',
            giaNhap: '',
            soLuong: '',
            thanhTien: ''
        })
    }

    //Xóa 1 thông số
    removeRowInvoice(index: number) {
        this.invoiceDetail.splice(index, 1)
    }

    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    key: any = ''
    currentPage: number = 1
    pageSizes: number[] = [10, 20, 30, 40]
    selectedPageSize: number = 10

    //Tìm kiếm
    onKeywordInput() {
        this.loadData()
    }
    //Khi pageSize thay đổi
    onPageSizeChange() {
        this.loadData()
    }

    //Khi thay đổi page
    onPageChange(page: number) {
        this.currentPage = page
        this.loadData()
    }

    //Back khi phân trang
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            this.loadData()
        }
    }

    //Next phân trang
    onNextPage() {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++
            this.loadData()
        }
    }

    //Tình số page
    getPageCount(): number {
        if (!this.hoadonnhapList || !this.hoadonnhapList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.hoadonnhapList.totalItems / this.selectedPageSize)
    }

    //Hiển thị page
    getPageNumbers(): number[] {
        const pageCount = this.getPageCount()
        if (pageCount <= 0) {
            return []
        }
        return Array(pageCount)
            .fill(0)
            .map((x, i) => i + 1)
    }

    //Hiển thị từ
    getStartIndex(): number {
        return (this.currentPage - 1) * this.selectedPageSize + 1
    }

    //Hiển thị đến
    getEndIndex(): number {
        if (this.selectedPageSize >= this.hoadonnhapList?.totalItems) {
            return this.hoadonnhapList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
