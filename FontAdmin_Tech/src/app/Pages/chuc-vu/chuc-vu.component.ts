import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IChucVu } from 'src/app/Models/chuc-vu'
import { ChucVuService } from 'src/app/Service/chuc-vu.service'
import * as moment from 'moment'
import { ExcelService } from 'src/app/Service/excel.service'

@Component({
    selector: 'app-chuc-vu',
    templateUrl: './chuc-vu.component.html',
    styleUrls: ['./chuc-vu.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ChucVuComponent {
    //title
    title = 'Chức vụ'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    chucvu!: IChucVu
    chucvuList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(
        private chucVuService: ChucVuService,
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
        this.chucvu = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.chucvu = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.chucVuService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
                this.chucvuList = data
                this.loaiXlsx = data.items
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(chucvu: IChucVu) {
        this.chucVuService.updateTrangThai(chucvu.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(chucvu: IChucVu) {
        this.chucVuService.getById(chucvu.id).subscribe((data) => {
            this.chucvu = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (this.chucvu.trangThai == undefined) {
            this.chucvu.trangThai = false
        }

        if (this.chucvu.tenChucVu) {
            if (this.chucvu.id) {
                this.chucVuService.update(this.chucvu).subscribe({
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
                this.chucVuService.create(this.chucvu).subscribe({
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
    delete(chucvu: IChucVu) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + chucvu.tenChucVu + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.chucVuService.delete(chucvu.id).subscribe((res) => {
                    this.loadData()

                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
    }

    loaiXlsx: any
    exportToExcel(): void {
        const headers = ['Mã chức vụ', 'Tên chức vụ', 'Trạng thái', 'Ngày tạo', 'Ngày sửa']

        const data = this.loaiXlsx.map((item: any) => [item.id, item.tenChucVu, item.trangThai, this.formatDate(item.createdAt), this.formatDate(item.updatedAt)])

        this.excelService.exportAsExcelFile(data, headers, 'ChucVu')
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
        if (!this.chucvuList || !this.chucvuList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.chucvuList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.chucvuList?.totalItems) {
            return this.chucvuList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
