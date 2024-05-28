import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IHangSanPham } from 'src/app/Models/hang-san-pham'
import { ExcelService } from 'src/app/Service/excel.service'
import { HangSanPhamService } from 'src/app/Service/hang-san-pham.service'
import * as moment from 'moment'

@Component({
    selector: 'app-hang-san-pham',
    templateUrl: './hang-san-pham.component.html',
    styleUrls: ['./hang-san-pham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class HangSanPhamComponent {
    //title
    title = 'Hãng sản phẩm'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    hangsp: IHangSanPham
    hangspList: any

    submitted: boolean = false
    //Gọi constructor
    constructor(
        private excelService: ExcelService,
        private hangSanPhamService: HangSanPhamService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.hangsp = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.hangsp = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm

    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.hangSanPhamService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
                this.hangspList = data
                this.loaiXlsx = data.items
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(hangsp: IHangSanPham) {
        this.hangSanPhamService.updateTrangThai(hangsp.id).subscribe((res) => {
            this.loadData()
        })
    }
    //Gọi mở sửa dialog
    editModal(hangsp: IHangSanPham) {
        this.hangSanPhamService.getById(hangsp.id).subscribe((data) => {
            this.hangsp = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true
        if (this.hangsp.trangThai == undefined) {
            this.hangsp.trangThai = false
        }
        if (this.hangsp.tenHang) {
            if (this.hangsp.id) {
                this.hangSanPhamService.update(this.hangsp).subscribe({
                    next: (res) => {
                        this.loadData()
                        this.closeDialog()
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                    },
                    error: (err) => {
                        this.loadData()
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                    }
                })
            } else {
                this.hangSanPhamService.create(this.hangsp).subscribe({
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
    }

    //Xóa 1 loại sản phẩm
    delete(hangsp: IHangSanPham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + hangsp.tenHang + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hangSanPhamService.delete(hangsp.id).subscribe((res) => {
                    this.loadData()

                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
    }

    loaiXlsx: any

    exportToExcel(): void {
        const headers = ['Mã hãng', 'Tên hãng', 'Trạng thái', 'Ngày tạo', 'Ngày sửa']

        const data = this.loaiXlsx.map((item: any) => [item.id, item.tenHang, item.trangThai, this.formatDate(item.createdAt), this.formatDate(item.updatedAt)])

        this.excelService.exportAsExcelFile(data, headers, 'HangSanPham')
    }

    private formatDate(dateString: string): string {
        if (!dateString) {
            return ''
        }
        return moment(dateString).format('DD/MM/YYYY HH:mm')
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
        if (!this.hangspList || !this.hangspList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.hangspList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.hangspList?.totalItems) {
            return this.hangspList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
