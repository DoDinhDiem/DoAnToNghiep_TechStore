import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'

@Injectable({
    providedIn: 'root'
})
export class DanhMucSanPhamService {
    constructor(private http: HttpClient) {}

    GetSanPhamByLoaiAndHang(id: any, hangid: any, sapxep: any, giaMax: any, page: any, pageSize: any): Observable<any[]> {
        const params = `?id=${id}&hangid=${hangid}&sapXep=${sapxep}&giaMax=${giaMax}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Client/GetSanPhamByLoaiAndHang${params}`)
    }

    GetGiaLonNhatTheoLoai(id: any) {
        return this.http.get<any>(baseUrl + 'api/Client/GetGiaLonNhatTheoLoai/' + id)
    }

    GetHangSanPham(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Client/GetHangSanPham/' + id)
    }
}
