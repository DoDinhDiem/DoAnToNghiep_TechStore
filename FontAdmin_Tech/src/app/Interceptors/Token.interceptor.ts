import { TokenApiModel } from '../Models/token-api-model'
import { Router } from '@angular/router'
import { NgToastService } from 'ng-angular-popup'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, switchMap, throwError } from 'rxjs'
import { AuthService } from '../Service/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const myToken = this.auth.getToken()

        // this.start.load();
        if (myToken) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${myToken}` } // "Bearer "+myToken
            })
        }

        return next.handle(request).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
                        //this.router.navigate(['login'])
                        //handle
                        return this.handleUnAuthorizedError(request, next)
                    }
                }
                return throwError(() => err)
            })
        )
    }
    handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        let tokeApiModel = new TokenApiModel()
        tokeApiModel.accessToken = this.auth.getToken()!
        tokeApiModel.refreshToken = this.auth.getRefreshToken()!
        console.log('token', tokeApiModel.accessToken)
        return this.auth.renewToken(tokeApiModel).pipe(
            switchMap((data: TokenApiModel) => {
                this.auth.storeRefreshToken(data.refreshToken)
                this.auth.storeToken(data.accessToken)
                req = req.clone({
                    setHeaders: { Authorization: `Bearer ${data.accessToken}` } // "Bearer "+myToken
                })
                return next.handle(req)
            }),
            catchError((err) => {
                return throwError(() => {
                    this.toast.warning({
                        detail: 'Thông báo',
                        summary: 'Phiên bản đã hết hạn! Vui lòng đăng nhập lại.'
                    })
                    this.router.navigate(['login'])
                })
            })
        )
    }
}
