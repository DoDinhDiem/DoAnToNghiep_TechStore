import { ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { IAccount } from 'src/app/Models/account'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { AccountService } from 'src/app/Service/account.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [MessageService]
})
export class AccountComponent {
    passwordType: string = 'password'
    passwordTypes: string = 'password'

    constructor(
        private accountService: AccountService,
        private userStoreService: UserStoreService,
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {}
    ngOnInit() {}

    togglePasswordVisibility() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
        this.changeDetectorRef.detectChanges()
    }
    togglePasswordVisibilitys() {
        this.passwordTypes = this.passwordType === 'password' ? 'text' : 'password'
        this.changeDetectorRef.detectChanges()
    }

    account: IAccount = {}
    singIn() {
        this.accountService.signIn(this.account).subscribe({
            next: (res) => {
                this.account = {}
                this.accountService.storeToken(res.accessToken)
                this.accountService.storeRefreshToken(res.refreshToken)
                const tokenPayload = this.accountService.decodedToken()
                this.userStoreService.setFullNameForStore(tokenPayload.unique_name)
                this.userStoreService.setEmailForStore(tokenPayload.email)
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                this.router.navigate(['/'])
            },
            error: (err) => {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: err?.error.message, life: 3000 })
            }
        })
    }

    khachhang: IKhachHang = {}
    signUp() {
        this.khachhang.trangThai = true
        this.accountService.signUp(this.khachhang).subscribe({
            next: (res) => {
                this.khachhang = {}
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
            },
            error: (err) => {
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: err?.error.message, life: 3000 })
            }
        })
    }
}
