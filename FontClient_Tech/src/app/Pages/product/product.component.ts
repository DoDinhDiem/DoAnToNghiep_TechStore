import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { baseUrl } from 'src/app/Api/baseHttp'
import { DanhMucSanPhamService } from 'src/app/Service/danh-muc-san-pham.service'
import { HeThongService } from 'src/app/Service/he-thong.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    baseUrl = baseUrl

    constructor(private danhMucSanPhamService: DanhMucSanPhamService, private heThongService: HeThongService, private route: ActivatedRoute) {}
    id!: any
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
            this.GetLoaiSanPham()
            this.GetGiaLonNhatTheoLoai(this.id)
            this.GetHangSanPham(this.id)
        })
    }
    giaRange: any = ''
    GetGiaLonNhatTheoLoai(id: any) {
        this.danhMucSanPhamService.GetGiaLonNhatTheoLoai(id).subscribe((data) => {
            this.giaMax = data
            this.giaRange = data
            this.GetSanPhamByLoaiAndHang(id)
        })
    }

    sanPhams: any
    tenLSP: any
    GetSanPhamByLoaiAndHang(id: any) {
        this.danhMucSanPhamService.GetSanPhamByLoaiAndHang(id, this.hangid, this.sapxepSelects, this.giaMax, this.currentPage, this.pageSizes).subscribe((data) => {
            this.sanPhams = data
            this.tenLSP = this.sanPhams.category
        })
    }

    loaiSanPham: any
    GetLoaiSanPham() {
        this.heThongService.GetLoaiSanPham().subscribe((data) => {
            this.loaiSanPham = data
        })
    }

    hangSanPham: any
    GetHangSanPham(id: any) {
        this.danhMucSanPhamService.GetHangSanPham(id).subscribe((data) => {
            this.hangSanPham = data
        })
    }

    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    hangid: any = ''
    sapxep: any[] = [
        {
            value: 'date',
            name: 'Mới'
        },
        {
            value: 'pricemin',
            name: 'Giá thấp đến cao'
        },
        {
            value: 'pricemax',
            name: 'Giá cao đến thấp'
        },
        {
            value: 'name',
            name: 'Tên'
        }
    ]
    sapxepSelects: any = 'date'
    giaMin: any = 0
    giaMax: any = ''
    currentPage: number = 1
    pageSizes: number = 16

    //Tìm kiếm
    onSlide() {
        this.GetSanPhamByLoaiAndHang(this.id)
    }
    //Khi pageSize thay đổi
    onSapXepChange() {
        this.GetSanPhamByLoaiAndHang(this.id)
    }

    onHangId(id: any) {
        this.hangid = id
        this.GetSanPhamByLoaiAndHang(this.id)
    }

    onResetMain() {
        this.hangid = ''
        this.giaMax = this.giaRange
        this.sapxepSelects = 'date'
        this.currentPage = 1
        this.GetSanPhamByLoaiAndHang(this.id)
    }

    onReset() {
        this.hangid = ''
        this.sapxepSelects = 'date'
        this.currentPage = 1
    }
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
        if (!this.sanPhams || !this.sanPhams.totalItems || this.pageSizes <= 0) {
            return 0
        }
        return Math.ceil(this.sanPhams.totalItems / this.pageSizes)
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
