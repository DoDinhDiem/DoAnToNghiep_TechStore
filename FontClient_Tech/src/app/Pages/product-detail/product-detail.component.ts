import { Component, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuItem, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { ChiTietSanPhamService } from 'src/app/Service/chi-tiet-san-pham.service'

declare var $: any
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    providers: [MessageService]
})
export class ProductDetailComponent {
    baseUrl = baseUrl
    id!: any
    responsiveOptionsSimilar: any[] | undefined
    constructor(
        private chiTietSanPhamService: ChiTietSanPhamService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router,
        private auth: AccountService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
            this.GetChiTietSanPham(this.id)
        })
        this.responsiveOptionsSimilar = [
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

    sanPham: any | undefined
    tenLoai: any
    thongSos: any[] = []
    Images: any[] | undefined
    GetChiTietSanPham(id: any) {
        this.chiTietSanPhamService.GetChiTietSanPham(id).subscribe((data) => {
            this.sanPham = data
            console.log(data)
            this.tenLoai = data.tenLoai
            this.Images = data.anhSanPhams
            this.thongSos = data.thongSos
            const loaiid = data.loaiSanPhamId
            this.updateDisplayedContent()
            this.GetSanPhamTuongTu(id, loaiid)
        })
    }

    sanPhams: any[] = []
    GetSanPhamTuongTu(id: any, loaiid: any) {
        this.chiTietSanPhamService.GetSanPhamTuongTu(id, loaiid).subscribe((data) => {
            this.sanPhams = data
        })
    }

    //Next or prev ảnh
    get activeIndex(): number {
        return this._activeIndex
    }

    set activeIndex(newValue) {
        if (this.Images && 0 <= newValue && newValue <= this.Images.length - 1) {
            this._activeIndex = newValue
        }
    }

    _activeIndex: number = 2

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]

    next() {
        this.activeIndex++
    }

    prev() {
        this.activeIndex--
    }

    //MoTa
    maxCharacters = 3500
    displayedContent!: string
    showMoreLessButton = false
    isContentExpanded = false

    updateDisplayedContent() {
        const content = this.sanPham.moTa || ''
        if (content.length > this.maxCharacters) {
            this.displayedContent = content.slice(0, this.maxCharacters) + '...'
            this.showMoreLessButton = true
        } else {
            this.displayedContent = content
            this.showMoreLessButton = false
        }
    }

    toggleContent() {
        this.isContentExpanded = !this.isContentExpanded

        if (this.isContentExpanded) {
            this.displayedContent = this.sanPham.moTa
        } else {
            this.displayedContent = this.sanPham.moTa.slice(0, this.maxCharacters)
        }
    }

    //Thông số
    showDetail: boolean = false
    toggleDetail() {
        this.showDetail = !this.showDetail
    }

    //Tăng giảm số lượng
    quantity: number = 1

    increment() {
        if (this.quantity < this.sanPham.soLuongTon) {
            this.quantity++
        }
    }

    decrement() {
        if (this.quantity > 1) {
            this.quantity--
        }
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
            this.cartService.addToCartDetail(product, this.quantity)
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm vào giỏ hàng thành công', life: 3000 })
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng đăng nhập! Để thực hiện mua hàng', life: 3000 })
        }
    }

    addToCartBuyNow(product: any) {
        if (this.auth.isLoggedIn()) {
            if (product.soLuongTon <= 0) {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Sản phẩm đã hết hàng!', life: 3000 })
                return
            }
            const cartQuantity = this.isProductInCart(product.id)
            if (cartQuantity >= product.soLuongTon) {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn!', life: 3000 })
                setTimeout(() => {
                    this.router.navigate(['/checkout'])
                }, 3000)
                return
            }
            this.cartService.addToCartDetail(product, this.quantity)
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm vào giỏ hàng thành công', life: 3000 })
            this.router.navigate(['/checkout'])
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng đăng nhập! Để thực hiện mua hàng', life: 3000 })
        }
    }
}
