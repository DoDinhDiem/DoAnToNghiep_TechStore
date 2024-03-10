import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { baseUrl } from '../Api/baseHttp'
import { JwtHelperService } from '@auth0/angular-jwt'
import { TokenApiModel } from '../Models/token-api-model'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userPayload: any
    constructor(private http: HttpClient, private router: Router) {
        this.userPayload = this.decodedToken()
    }

    signIn(userObj: any) {
        return this.http.post<any>(baseUrl + 'api/Login/Login', userObj)
    }

    signOut() {
        localStorage.clear()
        this.router.navigate(['login'])
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

    getRoleFromToken() {
        if (this.userPayload) return this.userPayload.role
    }

    getEmailFromToken() {
        if (this.userPayload) return this.userPayload.email
    }

    getChucVuFromToken() {
        if (this.userPayload) return this.userPayload.chucVu
    }

    getIdFromToken() {
        if (this.userPayload) return this.userPayload.id
    }

    renewToken(tokenApi: TokenApiModel) {
        return this.http.post<any>(baseUrl + 'api/Login/RefreshToken', tokenApi)
    }
}
