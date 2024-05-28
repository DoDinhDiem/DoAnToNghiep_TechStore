import { Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { INhanVien } from 'src/app/Models/nhan-vien'
import { AuthService } from 'src/app/Service/auth.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    providers: [MessageService]
})
export class AccountComponent {
    passwordType: string = 'password'

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private messageService: MessageService,
        private auth: AuthService,
        private userStore: UserStoreService
    ) {}

    togglePasswordVisibility() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
        this.changeDetectorRef.detectChanges()
    }
    nhanvien: INhanVien = {}
    onSubmit() {
        this.auth.signIn(this.nhanvien).subscribe({
            next: (res) => {
                this.nhanvien = {}
                this.auth.storeToken(res.accessToken)
                this.auth.storeRefreshToken(res.refreshToken)
                const tokenPayload = this.auth.decodedToken()
                this.userStore.setFullNameForStore(tokenPayload.unique_name)
                this.userStore.setRoleForStore(tokenPayload.role)
                this.userStore.setEmailForStore(tokenPayload.email)
                this.userStore.setChucVuForStore(tokenPayload.chucvu)
                if (res.passTrue == false) {
                    this.router.navigate(['/changepass'])
                } else {
                    this.router.navigate(['/'])
                }
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 })
            }
        })
    }
}
