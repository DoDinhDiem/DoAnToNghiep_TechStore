import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'

@Injectable({
    providedIn: 'root'
})
export class ChiTietSanPhamService {
    constructor(private http: HttpClient) {}

    GetChiTietSanPham(id: any) {
        return this.http.get<any>(baseUrl + 'api/Client/GetChiTietSanPham/' + id)
    }

    GetSanPhamTuongTu(spid: any, loaiid: any) {
        return this.http.get<any>(baseUrl + 'api/Client/GetSanPhamTuongTu/' + spid + '/' + loaiid)
    }
}
