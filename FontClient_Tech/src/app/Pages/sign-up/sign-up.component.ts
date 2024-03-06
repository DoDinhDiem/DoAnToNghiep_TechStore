import { ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { AccountService } from 'src/app/Service/account.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    providers: [MessageService]
})
export class SignUpComponent {
    passwordTypes: string = 'password'

    constructor(
        private accountService: AccountService,
        private userStoreService: UserStoreService,
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {}

    togglePasswordVisibilitys() {
        this.passwordTypes = this.passwordTypes === 'password' ? 'text' : 'password'
        this.changeDetectorRef.detectChanges()
    }

    khachhang: IKhachHang = {}
    signUp() {
        this.khachhang.trangThai = true
        this.accountService.signUp(this.khachhang).subscribe({
            next: (res) => {
                if (this.khachhang.email !== undefined) {
                    this.userStoreService.setEmailForStore(this.khachhang.email)
                    this.accountService.SendEmailOTP(this.khachhang.email).subscribe({})
                }
                this.khachhang = {}
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                setTimeout(() => {
                    this.router.navigate(['/confinmail'])
                }, 3000)
            },
            error: (err) => {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: err?.error.message, life: 3000 })
            }
        })
    }
}
