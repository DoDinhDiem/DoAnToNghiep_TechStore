import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { NgToastService } from 'ng-angular-popup'
import { AuthService } from '../Service/auth.service'
import { UserStoreService } from '../Service/user-store.service'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private auth: AuthService, private router: Router, private toast: NgToastService, private userStore: UserStoreService) {}

    canActivate(route: any): boolean {
        const roleFromToken = this.auth.getRoleFromToken()
        if (this.auth.isLoggedIn()) {
            const allowedRoles = route.data['allowedRoles']
            if (allowedRoles && allowedRoles.includes(roleFromToken)) {
                return true
            } else {
                this.toast.error({ detail: 'Lỗi', summary: 'Bạn không có quyền truy cập vào trang này!' })
                this.router.navigate(['/'])

                return false
            }
        } else {
            this.router.navigate(['login'])
            return false
        }
    }
}
