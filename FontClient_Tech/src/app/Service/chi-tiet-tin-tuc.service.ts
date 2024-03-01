import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Observable } from 'rxjs'
import { IBinhLuanTinTuc } from '../Models/binh-luan-tin-tuc'
import { IPhanHoiBinhLuan } from '../Models/phan-hoi-tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class ChiTietTinTucService {
    constructor(private http: HttpClient) {}

    GetChiTietTinTuc(id: any) {
        return this.http.get<any>(baseUrl + 'api/Client/GetChiTietTinTuc/' + id)
    }

    GetTinTucLienQuan(id: any, loaiid: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Client/GetTinTucLienQuan/' + id + '/' + loaiid)
    }

    GetBinhLuanTinTuc(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Client/GetBinhLuanTinTuc/' + id)
    }

    GetPhanHoiBinhLuan(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Client/GetPhanHoiBinhLuan/' + id)
    }

    //Thêm mới loại sản phẩm
    create(BinhLuanTinTuc: IBinhLuanTinTuc) {
        return this.http.post<any>(baseUrl + 'api/Client/Create_BinhLuanTinTuc', BinhLuanTinTuc)
    }
    createPhanHoi(PhanHoiBinhLuan: IPhanHoiBinhLuan) {
        return this.http.post<any>(baseUrl + 'api/Client/Create_PhanHoiBinhLuan', PhanHoiBinhLuan)
    }
}
