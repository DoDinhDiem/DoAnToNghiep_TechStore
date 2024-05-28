import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IMaGiamGia } from 'src/app/Models/ma-giam-gia'
import { MaGiamGiaService } from 'src/app/Service/ma-giam-gia.service'

@Component({
    selector: 'app-ma-giam-gia',
    templateUrl: './ma-giam-gia.component.html',
    styleUrls: ['./ma-giam-gia.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class MaGiamGiaComponent {
    //title
    title = 'Mã giảm giá'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    magiamgia!: IMaGiamGia
    magiamgiaList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(private maGiamGiaService: MaGiamGiaService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.magiamgia = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.magiamgia = {}
        this.submitted = false
    }

    id: any

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.maGiamGiaService.search(this.maCode, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.magiamgiaList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(magiamgia: IMaGiamGia) {
        this.maGiamGiaService.updateTrangThai(magiamgia.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(magiamgia: IMaGiamGia) {
        this.maGiamGiaService.getById(magiamgia.id).subscribe((data) => {
            this.magiamgia = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (this.magiamgia.trangThai == undefined) {
            this.magiamgia.trangThai = false
        }
        if (this.magiamgia.maGiamGia && this.magiamgia.soTienGiam && this.magiamgia.soLuong && this.magiamgia.hanSuDung && this.magiamgia.moTa) {
            if (this.magiamgia.id) {
                this.maGiamGiaService.update(this.magiamgia).subscribe({
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
                this.maGiamGiaService.create(this.magiamgia).subscribe({
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
    delete(magiamgia: IMaGiamGia) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + magiamgia.maGiamGia + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.maGiamGiaService.delete(magiamgia.id).subscribe((res) => {
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
    maCode: any = ''
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
        if (!this.magiamgiaList || !this.magiamgiaList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.magiamgiaList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.magiamgiaList?.totalItems) {
            return this.magiamgiaList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
