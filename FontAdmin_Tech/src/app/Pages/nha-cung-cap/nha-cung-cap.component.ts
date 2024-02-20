import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { INhaCungCap } from 'src/app/Models/nha-cung-cap'
import { NhaCungCapService } from 'src/app/Service/nha-cung-cap.service'

@Component({
    selector: 'app-nha-cung-cap',
    templateUrl: './nha-cung-cap.component.html',
    styleUrls: ['./nha-cung-cap.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class NhaCungCapComponent {
    //title
    title = 'Nhà cung cấp'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    nhacc!: INhaCungCap
    nhaccList: any

    //Gọi constructor
    constructor(private nhaCungCapService: NhaCungCapService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.nhacc = {}
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.nhacc = {}
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.nhaCungCapService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.nhaccList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(nhacc: INhaCungCap) {
        this.nhaCungCapService.updateTrangThai(nhacc.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(nhacc: INhaCungCap) {
        this.nhaCungCapService.getById(nhacc.id).subscribe((data) => {
            this.nhacc = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        if (this.nhacc.trangThai == undefined) {
            this.nhacc.trangThai = false
        }
        if (this.nhacc.tenNhaCC && this.nhacc.id) {
            this.nhaCungCapService.update(this.nhacc).subscribe({
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
            this.nhaCungCapService.create(this.nhacc).subscribe({
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

    //Xóa 1 loại sản phẩm
    delete(nhacc: INhaCungCap) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + nhacc.tenNhaCC + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nhaCungCapService.delete(nhacc.id).subscribe((res) => {
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
        if (!this.nhaccList || !this.nhaccList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.nhaccList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.nhaccList?.totalItems) {
            return this.nhaccList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
