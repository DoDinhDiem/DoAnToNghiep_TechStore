import { Component } from '@angular/core'
import { MenuItem, MessageService } from 'primeng/api'
import { IHoaDon } from 'src/app/Models/hoa-don'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { IMaGiamActive } from 'src/app/Models/ma-giam-active'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { CheckOutService } from 'src/app/Service/check-out.service'
import { MaGiamGiaService } from 'src/app/Service/ma-giam-gia.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss'],
    providers: [MessageService]
})
export class CheckOutComponent {
    selectedPaymentMethod!: string
    cartItems: any[] = []
    quantity = 0
    totalPrice: number = 0
    price: number = 0

    constructor(
        private cartService: CartService,
        private checkoutService: CheckOutService,
        private messageService: MessageService,
        private userStoreService: UserStoreService,
        private accountService: AccountService,
        private maGiamGiaService: MaGiamGiaService
    ) {
        this.GetEmail()
        this.getByIdKhachHang()
    }

    ngOnInit() {
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
    calculateSubtotal(cart: any): number {
        const discountedPrice = cart.thanhTien
        return discountedPrice * cart.soLuong
    }
    selectPaymentMethod(method: string) {
        this.selectedPaymentMethod = method
    }
    email!: string
    GetEmail() {
        this.userStoreService.getEmailFromStore().subscribe((val) => {
            const fullNameFromToken = this.accountService.getEmailFromToken()
            this.email = val || fullNameFromToken
        })
    }
    khachhang: IKhachHang = {}
    getByIdKhachHang() {
        this.checkoutService.getByIdKhachHang(this.email).subscribe((data) => {
            this.khachhang = data
        })
    }

    hoadon: IHoaDon = {}
    magiamActive: IMaGiamActive = {}
    onSubmit() {
        this.hoadon.tongTien = this.totalPriceFinal
        this.hoadon.userId = this.khachhang.id
        this.hoadon.hoTen = this.khachhang.hoTen
        this.hoadon.soDienThoai = this.khachhang.soDienThoai
        this.hoadon.diaChi = this.khachhang.diaChi
        if (this.discount) {
            this.hoadon.giamGia = this.discount.soTienGiam
        } else {
            this.hoadon.giamGia = 0
        }
        this.hoadon.email = this.email
        this.hoadon.trangThaiDonHang = 0
        this.hoadon.trangThaiThanhToan = false
        this.hoadon.phuongThucGiaoDich = 'Thanh toán khi nhận hàng'

        if (this.selectedPaymentMethod == undefined) {
            this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng chọn phương thức thanh toán', life: 3000 })
        } else {
            if (this.selectedPaymentMethod == 'vnpay') {
                this.checkoutService.GetLinkVnpay(this.hoadon).subscribe({
                    next: (res) => {
                        window.location.href = res.linkUrl
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                    }
                })
            } else if (this.selectedPaymentMethod == 'cash') {
                if (this.discount) {
                    this.magiamActive.khachHangId = this.khachhang.id
                    this.magiamActive.maGiamGiaId = this.discount.id
                }
                this.hoadon.chiTietHoaDonXuats = []
                for (let i = 0; i < this.cartItems.length; i++) {
                    const order = this.cartItems[i]
                    const chitiet = {
                        sanPhamId: order.id,
                        soLuong: order.soLuong,
                        giaBan: order.thanhTien,
                        thanhTien: Number(this.calculateSubtotal(order))
                    }
                    this.hoadon.chiTietHoaDonXuats.push(chitiet)
                }
                this.checkoutService.createHoaDonBan(this.hoadon).subscribe({
                    next: (res) => {
                        if (this.discount) {
                            this.maGiamGiaService.create(this.magiamActive).subscribe({})
                            this.maGiamGiaService.clearDiscount()
                            this.getMaGiamGia()
                        }
                        this.cartService.clearProducts()
                        this.cartService.loadCart()
                        this.cartItems = []
                        this.totalPrice = 0
                        this.totalPriceFinal = 0
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 })
                    }
                })
            }
        }
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

    totalPriceFinal: number = 0
    calculateTotalPriceFinal() {
        if (this.discount) {
            this.totalPriceFinal = this.cartService.getTotalPrice() - this.discount.soTienGiam
        } else {
            this.totalPriceFinal = this.cartService.getTotalPrice()
        }
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
