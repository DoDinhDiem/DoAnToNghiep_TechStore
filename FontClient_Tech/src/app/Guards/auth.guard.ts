import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { AccountService } from '../Service/account.service'
import { NgToastService } from 'ng-angular-popup'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private auth: AccountService, private router: Router, private toast: NgToastService) {}
    canActivate(): boolean {
        console.log(this.auth.isLoggedIn())
        if (this.auth.isLoggedIn()) {
            return true
        } else {
            this.toast.warning({
                detail: 'Thông báo',
                summary: 'Bạn chưa đăng nhập! Vui lòng đăng nhập để thực hiện.'
            })
            this.router.navigate(['account'])
            return false
        }
    }
}
