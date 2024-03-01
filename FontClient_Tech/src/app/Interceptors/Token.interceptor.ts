import { Router } from '@angular/router'
import { NgToastService } from 'ng-angular-popup'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, switchMap, throwError } from 'rxjs'
import { AccountService } from '../Service/account.service'
import { TokenApiModel } from '../Models/token'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AccountService, private toast: NgToastService, private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const myToken = this.auth.getToken()
        if (myToken) {
            const cloned = request.clone({
                setHeaders: { Authorization: `Bearer ${myToken}` }
            })
            return next.handle(cloned).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        return this.handleUnAuthorizedError(request, next)
                    } else {
                        return throwError(() => err)
                    }
                })
            )
        } else {
            return next.handle(request)
        }
    }
    handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        let tokeApiModel = new TokenApiModel()
        tokeApiModel.accessToken = this.auth.getToken()!
        tokeApiModel.refreshToken = this.auth.getRefreshToken()!
        return this.auth.renewToken(tokeApiModel).pipe(
            switchMap((data: TokenApiModel) => {
                this.auth.storeRefreshToken(data.refreshToken)
                this.auth.storeToken(data.accessToken)
                req = req.clone({
                    setHeaders: { Authorization: `Bearer ${data.accessToken}` }
                })
                return next.handle(req)
            }),
            catchError((err) => {
                return throwError(() => {
                    this.toast.warning({
                        detail: 'Thông báo',
                        summary: 'Phiên bản hết hạn! Vui lòng đăng nhập lại'
                    })
                    this.router.navigate(['account'])
                })
            })
        )
    }
}
