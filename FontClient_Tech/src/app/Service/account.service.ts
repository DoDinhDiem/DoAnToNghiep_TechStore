import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { TokenApiModel } from '../Models/token'

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private userPayload: any
    constructor(private http: HttpClient, private router: Router) {
        this.userPayload = this.decodedToken()
    }

    signUp(khachhang: any) {
        return this.http.post<any>(baseUrl + 'api/LoginClient/Register', khachhang)
    }

    signIn(khachhang: any) {
        return this.http.post<any>(baseUrl + 'api/LoginClient/Signin', khachhang)
    }

    signOut() {
        localStorage.clear()
        this.router.navigate(['/'])
    }

    storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue)
    }
    storeRefreshToken(tokenValue: string) {
        localStorage.setItem('refreshToken', tokenValue)
    }

    getToken() {
        return localStorage.getItem('token')
    }
    getRefreshToken() {
        return localStorage.getItem('refreshToken')
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token')
    }

    decodedToken() {
        const jwtHelper = new JwtHelperService()
        const token = this.getToken()!
        return jwtHelper.decodeToken(token)
    }

    getfullNameFromToken() {
        if (this.userPayload) return this.userPayload.unique_name
    }

    getEmailFromToken() {
        if (this.userPayload) return this.userPayload.email
    }

    renewToken(tokenApi: TokenApiModel) {
        return this.http.post<any>(baseUrl + 'api/LoginClient/RefreshToken', tokenApi)
    }
}
