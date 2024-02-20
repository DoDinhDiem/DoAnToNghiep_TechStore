import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'

@Injectable({
    providedIn: 'root'
})
export class TrangChuService {
    constructor(private http: HttpClient) {}

    GetSlide(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetSlide')
    }

    GetSanPhamGiamGia(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetSanPhamGiamGia')
    }

    GetSanPhamMoi(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetSanPhamMoi')
    }

    GetSanPhamBanChay(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetSanPhamBanChay')
    }

    GetDienThoai(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetDienThoai')
    }

    GetLapTop(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetLapTop')
    }
}
