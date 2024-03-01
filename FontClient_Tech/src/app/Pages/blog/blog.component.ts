import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { baseUrl } from 'src/app/Api/baseHttp'
import { DanhMucTinTucService } from 'src/app/Service/danh-muc-tin-tuc.service'

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
    constructor(private danhMucTinTuc: DanhMucTinTucService, private route: ActivatedRoute) {}
    id!: any
    baseUrl = baseUrl
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
            this.GetTinTucByLoai()
        })
    }

    tinTucs: any
    tenDanhMuc: any
    GetTinTucByLoai() {
        this.danhMucTinTuc.GetTinTucByLoai(this.id, this.currentPage, this.pageSizes).subscribe((data) => {
            this.tinTucs = data
            this.tenDanhMuc = this.tinTucs.tenLoaiTinTuc
        })
    }

    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    currentPage: number = 1
    pageSizes: number = 8

    //Khi thay đổi page
    onPageChange(page: number) {
        this.currentPage = page
        // this.loadData()
    }
    //Back khi phân trang
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            // this.loadData()
        }
    }

    //Next phân trang
    onNextPage() {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++
            // this.loadData()
        }
    }

    //Tình số page
    getPageCount(): number {
        if (!this.tinTucs || !this.tinTucs.totalItems || this.pageSizes <= 0) {
            return 0
        }
        return Math.ceil(this.tinTucs.totalItems / this.pageSizes)
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
}
