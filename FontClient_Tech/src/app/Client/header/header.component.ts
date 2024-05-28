import { Component, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { baseUrl } from 'src/app/Api/baseHttp'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { HeThongService } from 'src/app/Service/he-thong.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    baseUrl = baseUrl
    searchTerm = ''

    fullName: string = ''
    constructor(
        private heThongService: HeThongService,
        private cartService: CartService,
        activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private userStoreService: UserStoreService
    ) {
        activatedRoute.params.subscribe((params: any) => {
            if (params.serchTerm) {
                this.searchTerm = params.searchTerm
            }
        })
    }
    cartItems: any[] = []
    quantity = 0
    totalPrice: number = 0
    isLoggedIn: boolean = false
    ngOnInit() {
        this.GetName()
        this.GetLoaiSanPham()
        this.GetLoaiTinTuc()
        this.cartService.loadCart()
        this.cartService.products$.subscribe((products) => {
            this.getQuantity()
            this.calculateTotalPrice()
            this.updateCart(products)
        })
        this.cartItems = this.cartService.getCartItem()
    }

    loaiSanPham: any[] = []
    GetLoaiSanPham() {
        this.heThongService.GetLoaiSanPham().subscribe((data) => {
            this.loaiSanPham = data
        })
    }

    tinTuc: any[] = []
    GetLoaiTinTuc() {
        this.heThongService.GetLoaiTinTuc().subscribe((data) => {
            this.tinTuc = data
        })
    }

    getQuantity() {
        this.quantity = this.cartService.getQuantity()
    }

    calculateTotalPrice() {
        this.totalPrice = this.cartService.getTotalPrice()
    }

    removeFromCart(product: any) {
        this.cartService.removeProduct(product)
        this.cartItems = this.cartService.getCartItem()
        this.getQuantity()
        this.calculateTotalPrice()
    }

    updateCart(cartItems: any[]) {
        this.cartItems = cartItems
        this.getQuantity()
        this.calculateTotalPrice()
    }

    search(term: string): void {
        if (term) this.router.navigateByUrl('/search/' + term)
    }

    GetName() {
        this.userStoreService.getFullNameFromStore().subscribe((val) => {
            const fullNameFromToken = this.accountService.getfullNameFromToken()
            this.fullName = val || fullNameFromToken
            this.isLoggedIn = this.accountService.isLoggedIn()
        })
    }
    Logout() {
        this.accountService.signOut()
        this.isLoggedIn = this.accountService.isLoggedIn()
    }

    isProfileMenuOpen: boolean = false

    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen
    }
    stopPropagation(event: Event) {
        event.stopPropagation()
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {
        if (!(event.target.closest('.profile-main') || event.target.closest('li'))) {
            this.isProfileMenuOpen = false
        }
    }
}
