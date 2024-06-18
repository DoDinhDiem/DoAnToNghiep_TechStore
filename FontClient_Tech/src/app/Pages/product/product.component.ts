import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { DanhMucSanPhamService } from 'src/app/Service/danh-muc-san-pham.service'
import { HeThongService } from 'src/app/Service/he-thong.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [MessageService]
})
export class ProductComponent {
    baseUrl = baseUrl

    constructor(
        private danhMucSanPhamService: DanhMucSanPhamService,
        private heThongService: HeThongService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private messageService: MessageService,
        private auth: AccountService
    ) {}
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
        this.GetGiaLonNhatTheoLoai(this.id)
    }

    //Back khi phân trang
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            this.GetGiaLonNhatTheoLoai(this.id)
        }
    }

    //Next phân trang
    onNextPage() {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++
            this.GetGiaLonNhatTheoLoai(this.id)
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

    isProductInCart(productId: number): number {
        const cartItem = this.cartService.getCartItem().find((item) => item.id === productId)
        return cartItem ? cartItem.soLuong : 0
    }

    addToCart(product: any) {
        if (this.auth.isLoggedIn()) {
            if (product.soLuongTon <= 0) {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Sản phẩm đã hết hàng!', life: 3000 })
                return
            }

            const cartQuantity = this.isProductInCart(product.id)
            if (cartQuantity >= product.soLuongTon) {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn!', life: 3000 })
                return
            }

            this.cartService.addToCart(product)
            this.cartService.loadCart()
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm vào giỏ hàng thành công', life: 3000 })
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng đăng nhập! Để thực hiện mua hàng', life: 3000 })
        }
    }
}
