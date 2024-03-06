import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { IChangePass } from '../Models/change-pass'

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    ResetPass(email: any) {
        return this.http.post<any>(baseUrl + `api/Login/ResetPass/${email}`, null)
    }
    changePass(changePass: IChangePass) {
        return this.http.put<any>(baseUrl + 'api/Login/ChangePassword', changePass)
    }
}
