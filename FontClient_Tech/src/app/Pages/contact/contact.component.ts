import { Component } from '@angular/core'
import { MenuItem, MessageService } from 'primeng/api'
import { IFeedBack } from 'src/app/Models/feed-back'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { AccountService } from 'src/app/Service/account.service'
import { CheckOutService } from 'src/app/Service/check-out.service'
import { HeThongService } from 'src/app/Service/he-thong.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [MessageService]
})
export class ContactComponent {
    constructor(
        private heThongService: HeThongService,
        private checkoutService: CheckOutService,
        private messageService: MessageService,
        private userStoreService: UserStoreService,
        private accountService: AccountService
    ) {
        this.GetEmail()
        this.getByIdKhachHang()
    }
    ngOnInit() {
        this.GetLienHe()
    }

    contact: any = {}
    GetLienHe() {
        this.heThongService.GetLienHe().subscribe((data) => {
            this.contact = data
        })
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
            this.feedback.email = this.email
            this.feedback.hoTen = this.khachhang.hoTen
        })
    }

    feedback: IFeedBack = {}
    onSubmit() {
        if (this.accountService.isLoggedIn()) {
            this.feedback.userId = this.khachhang.id
            this.feedback.trangThai = false
            this.heThongService.CreateFeed(this.feedback).subscribe((data) => {
                this.feedback = {}
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: data.message })
            })
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng đăng nhập!' })
        }
    }
}
