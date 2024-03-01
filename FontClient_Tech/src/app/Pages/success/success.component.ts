import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IHoaDon } from 'src/app/Models/hoa-don'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { ILichSuGiaoDich } from 'src/app/Models/lich-su-giao-dich'
import { AccountService } from 'src/app/Service/account.service'
import { CartService } from 'src/app/Service/cart.service'
import { CheckOutService } from 'src/app/Service/check-out.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

interface IOrderInfo {
    name?: string
    phone?: any
    email?: string
    address?: string
    notes?: string
    discount?: string
}
@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
    vnp_Amount: any
    vnp_BankCode: any
    vnp_CardType: any
    vnp_OrderInfo: any
    vnp_TransactionStatus: any

    cartItems: any[] = []
    quantity = 0
    totalPrice: number = 0
    price: number = 0

    notification: boolean = true

    constructor(
        private cartService: CartService,
        private checkoutService: CheckOutService,
        private userStoreService: UserStoreService,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.queryParams.subscribe((params) => {
            this.vnp_Amount = params['vnp_Amount']
            this.vnp_BankCode = params['vnp_BankCode']
            this.vnp_CardType = params['vnp_CardType']
            this.vnp_OrderInfo = params['vnp_OrderInfo']
            this.vnp_TransactionStatus = params['vnp_TransactionStatus']
        })
        this.cartService.loadCart()
        this.cartService.products$.subscribe((products) => {
            this.getQuantity()
            this.calculateTotalPrice()
        })
        this.cartItems = this.cartService.getCartItem()
        this.GetEmail()
        this.getByIdKhachHang()
        this.orderInfor()
    }

    parsedOrderInfo: Partial<IOrderInfo> = {}

    orderInfor() {
        const regex = /(\w+)=(.*?)(?=\s+\w+=|$)/g
        let match
        while ((match = regex.exec(this.vnp_OrderInfo)) !== null) {
            const [, key, value] = match
            this.parsedOrderInfo[key as keyof IOrderInfo] = value
        }
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

    email!: string
    GetEmail() {
        this.userStoreService.getEmailFromStore().subscribe((val) => {
            const fullNameFromToken = this.accountService.getEmailFromToken()
            this.email = val || fullNameFromToken
        })
    }

    khachhang!: IKhachHang
    id: any
    getByIdKhachHang() {
        this.checkoutService.getByIdKhachHang(this.email).subscribe((data) => {
            this.khachhang = data
            this.id = this.khachhang.id
            this.saveInvoice()
        })
    }

    hoadon: IHoaDon = {}
    lichsugiaodich: ILichSuGiaoDich = {}
    saveInvoice() {
        //Hóa Đơn
        if (this.vnp_TransactionStatus == 0) {
            this.hoadon.userId = this.khachhang.id
            this.hoadon.hoTen = this.parsedOrderInfo.name
            this.hoadon.soDienThoai = this.parsedOrderInfo.phone
            this.hoadon.diaChi = this.parsedOrderInfo.address
            this.hoadon.email = this.parsedOrderInfo.email
            this.hoadon.ghiChu = this.parsedOrderInfo.notes
            this.hoadon.tongTien = this.vnp_Amount
            this.hoadon.trangThaiDonHang = 0
            this.hoadon.trangThaiThanhToan = true
            this.hoadon.phuongThucGiaoDich = 'Thanh toán qua ví VNPAY'

            //Lịch sử giao dịch
            this.lichsugiaodich.khachHangId = this.khachhang.id
            this.lichsugiaodich.soTien = this.vnp_Amount
            this.lichsugiaodich.nganHang = this.vnp_BankCode
            this.lichsugiaodich.loaiThe = this.vnp_CardType

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
                    this.lichsugiaodich.hoaDonId = res.id
                    this.checkoutService.createLichSuGiaoDich(this.lichsugiaodich).subscribe({})
                    this.cartService.clearProducts()
                    this.cartService.loadCart()
                    this.cartItems = []
                    this.totalPrice = 0
                    this.router.navigate(['/success'])

                    this.notification = true
                }
            })
        } else {
            this.notification = false
        }
    }
}
