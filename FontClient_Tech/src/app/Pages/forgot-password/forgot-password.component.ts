import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { AccountService } from 'src/app/Service/account.service'

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    providers: [MessageService]
})
export class ForgotPasswordComponent {
    constructor(private accountService: AccountService, private messageService: MessageService) {}
    email: any
    onSubmit() {
        this.accountService.ResetPass(this.email).subscribe((res) => {
            this.email = ''
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
        })
    }
}
