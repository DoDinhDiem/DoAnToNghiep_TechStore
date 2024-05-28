import { Component, OnInit } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ILoaiSanPham } from 'src/app/Models/loai-san-pham'
import { ExcelService } from 'src/app/Service/excel.service'
import { LoaiSanPhamService } from 'src/app/Service/loai-san-pham.service'
import * as moment from 'moment'

@Component({
    selector: 'app-loai-san-pham',
    templateUrl: './loai-san-pham.component.html',
    styleUrls: ['./loai-san-pham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class LoaiSanPhamComponent implements OnInit {
    //title
    title = 'Loại sản phẩm'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    loaisp: ILoaiSanPham
    loaispList: any

    //Gọi constructor
    constructor(
        private loaiSanPhamService: LoaiSanPhamService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private excelService: ExcelService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.loaisp = {}
        this.submitted = false
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.submitted = false
        this.loaisp = {}
    }

    id: any

    loaiXlsx: any
    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.loaiSanPhamService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
                this.loaispList = data
                this.loaiXlsx = data.items
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(loaisp: ILoaiSanPham) {
        this.loaiSanPhamService.updateTrangThai(loaisp.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(loaisp: ILoaiSanPham) {
        this.loaiSanPhamService.getById(loaisp.id).subscribe((data) => {
            this.loaisp = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    submitted: boolean = false
    onSubmit() {
        this.submitted = true
        if (this.loaisp.trangThai == undefined) {
            this.loaisp.trangThai = false
        }
        if (this.loaisp.tenLoai) {
            if (this.loaisp.id) {
                this.loaiSanPhamService.update(this.loaisp).subscribe({
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
                this.loaiSanPhamService.create(this.loaisp).subscribe({
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
    exportToExcel(): void {
        const headers = ['Mã loại', 'Tên loại', 'Trạng thái', 'Ngày tạo', 'Ngày sửa']

        const data = this.loaiXlsx.map((item: any) => [item.id, item.tenLoai, item.trangThai, this.formatDate(item.createdAt), this.formatDate(item.updatedAt)])

        this.excelService.exportAsExcelFile(data, headers, 'LoaiSanPham')
    }

    private formatDate(dateString: string): string {
        if (!dateString) {
            return ''
        }
        return moment(dateString).format('DD/MM/YYYY HH:mm')
    }

    //Xóa 1 loại sản phẩm
    delete(loaisp: ILoaiSanPham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + loaisp.tenLoai + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loaiSanPhamService.delete(loaisp.id).subscribe((res) => {
                    this.loadData()
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
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
        if (!this.loaispList || !this.loaispList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.loaispList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.loaispList?.totalItems) {
            return this.loaispList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
