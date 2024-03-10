import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { GiamGiaActiveService } from 'src/app/Service/giam-gia-active.service'

@Component({
    selector: 'app-giam-gia-active',
    templateUrl: './giam-gia-active.component.html',
    styleUrls: ['./giam-gia-active.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class GiamGiaActiveComponent {
    //title
    title = 'Khách hàng sử dụng mã'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    loaispList: any

    constructor(
        private giamGiaActiveService: GiamGiaActiveService,
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

    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.giamGiaActiveService.search(this.id, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.loaispList = data
                this.showSkeleton = false
            })
        }, 2000)
    }
    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    id: any
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
