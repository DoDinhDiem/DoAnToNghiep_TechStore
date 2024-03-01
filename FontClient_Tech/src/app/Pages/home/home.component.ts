import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
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

    constructor(private trangChuService: TrangChuService, private cartService: CartService, private messageService: MessageService) {}
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

    addToCart(product: any) {
        this.cartService.addToCart(product)
        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm vào giỏ hàng thành công', life: 3000 })
    }
}
