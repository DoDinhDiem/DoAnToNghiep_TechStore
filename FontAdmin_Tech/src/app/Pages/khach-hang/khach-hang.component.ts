import { Component } from '@angular/core'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { KhachHangService } from 'src/app/Service/khach-hang.service'

@Component({
    selector: 'app-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['./khach-hang.component.scss']
})
export class KhachHangComponent {
    title = 'Khách hàng'
    constructor(private khachHangService: KhachHangService) {}

    khachhang!: IKhachHang
    khachhangList: any

    ngOnInit() {
        this.loadData()
    }
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.khachHangService.search(this.key, this.email, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.khachhangList = data
                console.log(data)
                this.showSkeleton = false
            })
        }, 2000)
    }

    trangThai(khachhang: IKhachHang) {
        this.khachHangService.updateTrangThai(khachhang.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Khai báo key, page, pageSize
    key: any = ''
    email: any = ''
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
        if (!this.khachhangList || !this.khachhangList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.khachhangList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.khachhangList?.totalItems) {
            return this.khachhangList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
