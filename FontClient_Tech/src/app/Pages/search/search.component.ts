import { Component } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { CartService } from 'src/app/Service/cart.service'
import { HeThongService } from 'src/app/Service/he-thong.service'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [MessageService]
})
export class SearchComponent {
    baseUrl = baseUrl
    sanphamList: any
    constructor(private heThongService: HeThongService, public router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService, private messageService: MessageService) {}
    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.key = params.get('searchTerm')
            this.loadData()
        })
    }
    loadData() {
        this.heThongService.GetSearchSanPham(this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
            this.sanphamList = data
        })
    }

    addToCart(product: any) {
        this.cartService.addToCart(product)
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm vào giỏ hàng thành công', life: 1000 })
    }

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
        if (!this.sanphamList || !this.sanphamList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.sanphamList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.sanphamList?.totalItems) {
            return this.sanphamList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }
}
