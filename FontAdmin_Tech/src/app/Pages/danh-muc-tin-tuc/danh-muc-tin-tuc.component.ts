import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IDanhMucTinTuc } from 'src/app/Models/danh-muc-tin-tuc'
import { DanhMucTinTucService } from 'src/app/Service/danh-muc-tin-tuc.service'
import { ExcelService } from 'src/app/Service/excel.service'
import * as moment from 'moment'

@Component({
    selector: 'app-danh-muc-tin-tuc',
    templateUrl: './danh-muc-tin-tuc.component.html',
    styleUrls: ['./danh-muc-tin-tuc.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class DanhMucTinTucComponent {
    //title
    title = 'Danh mục tin tức'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    danhmuc!: IDanhMucTinTuc
    danhmucList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(
        private danhMucSanPhamService: DanhMucTinTucService,
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
        this.danhmuc = {}
        this.visible = true
        ;(this.Save = 'Lưu'), (this.submitted = false)
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.danhmuc = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.danhMucSanPhamService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
                this.danhmucList = data
                this.loaiXlsx = data.items
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(danhmuc: IDanhMucTinTuc) {
        this.danhMucSanPhamService.updateTrangThai(danhmuc.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(danhmuc: IDanhMucTinTuc) {
        this.danhMucSanPhamService.getById(danhmuc.id).subscribe((data) => {
            this.danhmuc = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (this.danhmuc.trangThai == undefined) {
            this.danhmuc.trangThai = false
        }

        if (this.danhmuc.tenDanhMuc) {
            if (this.danhmuc.id) {
                this.danhMucSanPhamService.update(this.danhmuc).subscribe({
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
                this.danhMucSanPhamService.create(this.danhmuc).subscribe({
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
    delete(danhmuc: IDanhMucTinTuc) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + danhmuc.tenDanhMuc + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.danhMucSanPhamService.delete(danhmuc.id).subscribe((res) => {
                    this.loadData()

                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
    }
    loaiXlsx: any
    exportToExcel(): void {
        const headers = ['Mã loại tin tức', 'Tên loại tin tức', 'Trạng thái', 'Ngày tạo', 'Ngày sửa']

        const data = this.loaiXlsx.map((item: any) => [item.id, item.tenDanhMuc, item.trangThai, this.formatDate(item.createdAt), this.formatDate(item.updatedAt)])

        this.excelService.exportAsExcelFile(data, headers, 'DanhMucTinTuc')
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
        if (!this.danhmucList || !this.danhmucList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.danhmucList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.danhmucList?.totalItems) {
            return this.danhmucList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
