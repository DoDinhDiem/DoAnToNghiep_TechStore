import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IChangePass } from 'src/app/Models/change-pass'
import { AccountService } from 'src/app/Service/account.service'
import { ProfileService } from 'src/app/Service/profile.service'

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    providers: [MessageService]
})
export class ChangePasswordComponent {
    constructor(private profileService: ProfileService, private acount: AccountService, private messageService: MessageService) {}

    email: any
    ngOnInit() {
        this.email = this.acount.getEmailFromToken()
    }

    changePass: IChangePass = {}
    confirmNewPassword: any
    onSubmit() {
        this.changePass.email = this.email
        console.log(this.changePass.newPassword)
        if (this.changePass.newPassword == this.confirmNewPassword) {
            this.profileService.changePass(this.changePass).subscribe({
                next: (res) => {
                    this.changePass = {}
                    this.confirmNewPassword = undefined
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
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
