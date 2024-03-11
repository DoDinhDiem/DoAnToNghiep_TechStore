import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { TrangChuService } from 'src/app/Service/trang-chu.service'
declare var $: any
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MessageService]
})
export class HomeComponent implements OnInit {
    baseUrl = baseUrl
    responsiveOptions: any[] | undefined
    images: any[] | undefined

    constructor(private trangChuService: TrangChuService, private cartService: CartService, private messageService: MessageService, private auth: AccountService) {}
    ngOnInit() {
        this.GetSlide()
        this.GetSanPhamBanChay()
        this.GetSanPhamGiamGia()
        this.GetSanPhamMoi()
        this.GetDienThoai()
        this.GetLapTop()
        this.GetTinTuc()

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }

    GetSlide() {
        this.trangChuService.GetSlide().subscribe((data) => {
            this.images = data
        })
    }

    sanPhamBanChay: any[] = []
    GetSanPhamBanChay() {
        this.trangChuService.GetSanPhamBanChay().subscribe((data) => {
            this.sanPhamBanChay = data
        })
    }

    sanPhamGiamGia: any[] = []
    GetSanPhamGiamGia() {
        this.trangChuService.GetSanPhamGiamGia().subscribe((data) => {
            this.sanPhamGiamGia = data
        })
    }

    sanPhamMoi: any[] = []
    GetSanPhamMoi() {
        this.trangChuService.GetSanPhamMoi().subscribe((data) => {
            this.sanPhamMoi = data
        })
    }

    dienThoai: any[] = []
    GetDienThoai() {
        this.trangChuService.GetDienThoai().subscribe((data) => {
            this.dienThoai = data
            console.log(this.dienThoai)
        })
    }

    lapTop: any[] = []
    GetLapTop() {
        this.trangChuService.GetLapTop().subscribe((data) => {
            this.lapTop = data
        })
    }

    tinTuc: any[] = []
    GetTinTuc() {
        this.trangChuService.GetTinTuc().subscribe((data) => {
            this.tinTuc = data
        })
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
