import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { INhanVien } from 'src/app/Models/nhan-vien'
import { ProfileService } from 'src/app/Service/profile.service'

@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.scss'],
    providers: [MessageService]
})
export class ResetPassComponent {
    constructor(private profileService: ProfileService, private messageService: MessageService) {}

    nhanvien: INhanVien = {}
    onSubmit() {
        this.profileService.ResetPass(this.nhanvien.email).subscribe({
            next: (res) => {
                this.nhanvien = {}
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
            },
            error: (err) => {
                this.nhanvien = {}
                this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: err.error.message, life: 3000 })
            }
        })
    }
}
