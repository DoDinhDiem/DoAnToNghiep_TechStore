import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { MaGiamGiaService } from 'src/app/Service/ma-giam-gia.service'

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
    baseUrl = baseUrl
    cartItems: any[] = []
    quantity = 0
    totalPrice: number = 0
    totalPriceFinal: number = 0
    price: number = 0

    email: any

    constructor(private cartService: CartService, private auth: AccountService, private maGiamGiaService: MaGiamGiaService) {}

    ngOnInit() {
        this.email = this.auth.getEmailFromToken()
        this.cartService.loadCart()
        this.getDiscount()
        this.cartService.products$.subscribe((products) => {
            this.getQuantity()
            this.calculateTotalPrice()
            this.calculateTotalPriceFinal()
        })
        this.cartItems = this.cartService.getCartItem()
        this.getMaGiamGia()
    }
    getQuantity() {
        this.quantity = this.cartService.getQuantity()
    }
    calculateTotalPrice() {
        this.totalPrice = this.cartService.getTotalPrice()
    }
    calculateTotalPriceFinal() {
        if (this.discount) {
            this.totalPriceFinal = this.cartService.getTotalPrice() - this.discount.soTienGiam
        } else {
            this.totalPriceFinal = this.totalPrice
        }
    }
    removeFromCart(product: any) {
        this.cartService.removeProduct(product)
        this.cartItems = this.cartService.getCartItem()
        this.getQuantity()
        this.calculateTotalPrice()
    }

    incrementQuantity(cart: any) {
        this.cartService.incrementQuantity(cart)
    }

    decrementQuantity(cart: any) {
        this.cartService.decrementQuantity(cart)
    }

    calculateSubtotal(cart: any): number {
        return cart.thanhTien * cart.soLuong
    }

    dropdownVisible: boolean = false
    toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible
    }

    giamgia: any
    getMaGiamGia() {
        this.maGiamGiaService.GetMaGiamGia(this.email).subscribe((res) => {
            this.giamgia = res
        })
    }

    setDiscount(discount: any) {
        this.maGiamGiaService.storeDiscount(discount)
        this.getDiscount()
        this.calculateTotalPriceFinal()
    }

    discount: any
    getDiscount() {
        this.discount = this.maGiamGiaService.getDiscount()
    }
    clearDiscount() {
        this.maGiamGiaService.clearDiscount()
        this.getDiscount()
        this.calculateTotalPriceFinal()
    }
}
