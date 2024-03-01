import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { AccountService } from '../Service/account.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private auth: AccountService, private router: Router, private messageService: MessageService) {}
    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            return true
        } else {
            this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Bạn chưa đăng nhập! Vui lòng đăng nhập để thực hiện.', life: 3000 })
            this.router.navigate(['/account'])
            return false
        }
    }
}