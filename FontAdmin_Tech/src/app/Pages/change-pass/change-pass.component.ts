import { ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { IChangePass } from 'src/app/Models/change-pass'
import { INhanVien } from 'src/app/Models/nhan-vien'
import { AuthService } from 'src/app/Service/auth.service'
import { ProfileService } from 'src/app/Service/profile.service'

@Component({
    selector: 'app-change-pass',
    templateUrl: './change-pass.component.html',
    styleUrls: ['./change-pass.component.scss'],
    providers: [MessageService]
})
export class ChangePassComponent {
    passwordType: string = 'password'

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private profileService: ProfileService,
        private router: Router,
        private messageService: MessageService,
        private auth: AuthService
    ) {}

    togglePasswordVisibility() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
        this.changeDetectorRef.detectChanges()
    }

    email: any

    ngOnInit() {
        this.email = this.auth.getEmailFromToken()
    }

    nhanvien: INhanVien = {}
    changePass: IChangePass = {}
    confirmNewPassword: any
    onSubmit() {
        this.changePass.email = this.email
        if (this.changePass.newPassword == this.confirmNewPassword) {
            this.profileService.changePass(this.changePass).subscribe({
                next: (res) => {
                    this.changePass = {}
                    this.confirmNewPassword = undefined
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                    setTimeout(() => {
                        this.router.navigate(['/'])
                    }, 3000)
                },
                error: (err) => {
                    this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: err.error.message, life: 3000 })
                }
            })
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Mật khẩu xác nhận không khớp', life: 3000 })
        }
    }
}
