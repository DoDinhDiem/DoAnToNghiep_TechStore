import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IThongSoSanPham } from 'src/app/Models/thong-so-san-pham'
import { ThongSoSanPhamService } from 'src/app/Service/thong-so-san-pham.service'

@Component({
    selector: 'app-thong-so-san-pham',
    templateUrl: './thong-so-san-pham.component.html',
    styleUrls: ['./thong-so-san-pham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ThongSoSanPhamComponent {
    //title
    title = 'Thông số sản phẩm'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    thongso!: IThongSoSanPham
    thongsoList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(
        private thongSoSanPhamService: ThongSoSanPhamService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
        })
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.thongso = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.thongso = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.thongSoSanPhamService.search(this.id, this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.thongsoList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(thongso: IThongSoSanPham) {
        this.thongSoSanPhamService.updateTrangThai(thongso.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(thongso: IThongSoSanPham) {
        this.thongSoSanPhamService.getById(thongso.id).subscribe((data) => {
            this.thongso = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (this.thongso.trangThai == undefined) {
            this.thongso.trangThai = false
        }
        this.thongso.sanPhamId = this.id
        if (this.thongso.tenThongSo && this.thongso.moTa) {
            if (this.thongso.id) {
                this.thongSoSanPhamService.update(this.thongso).subscribe({
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
                this.thongSoSanPhamService.create(this.thongso).subscribe({
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
    delete(thongso: IThongSoSanPham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + thongso.tenThongSo + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.thongSoSanPhamService.delete(thongso.id).subscribe((res) => {
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
    id!: number
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
        if (!this.thongsoList || !this.thongsoList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.thongsoList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.thongsoList?.totalItems) {
            return this.thongsoList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
