import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IHangSanPham } from 'src/app/Models/hang-san-pham'
import { HangSanPhamService } from 'src/app/Service/hang-san-pham.service'

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
    hangsp!: IHangSanPham
    hangspList: any

    //Gọi constructor
    constructor(private hangSanPhamService: HangSanPhamService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.hangsp = {}
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.hangsp = {}
    }

    //Gọi load loại sản phẩm

    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.hangSanPhamService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.hangspList = data
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
        if (this.hangsp.trangThai == undefined) {
            this.hangsp.trangThai = false
        }
        if (this.hangsp.tenHang && this.hangsp.id) {
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
