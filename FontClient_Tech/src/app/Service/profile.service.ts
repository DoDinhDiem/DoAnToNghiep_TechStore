import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IChangePass } from '../Models/change-pass'

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getLichSuMuaHang(email: string, trangThai: number, page: number, pageSize: number): Observable<any[]> {
        const params = `?email=${email}&trangThai=${trangThai}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Client/LichSuMuaHang${params}`)
    }

    changePass(changePass: IChangePass) {
        return this.http.put<any>(baseUrl + 'api/LoginClient/ChangePassword', changePass)
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Client/GetById_HoaDonXuat/' + id)
    }

    getUpdateDonHang(id: any, hoadon: any): Observable<any> {
        return this.http.put<any>(baseUrl + `api/Client/Update_DonHang/${id}`, hoadon)
    }
}
