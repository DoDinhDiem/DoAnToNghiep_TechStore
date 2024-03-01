import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IBinhLuanTinTuc } from '../Models/binh-luan-tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class BinhLuanTinTucService {
    constructor(private http: HttpClient) {}
    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/BinhLuanTinTuc/GetById_BinhLuanTinTuc/' + id)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/BinhLuanTinTuc/TrangThai/' + id, null)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(id: number, page: number, pageSize: number): Observable<any[]> {
        const params = `?id=${id}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/BinhLuanTinTuc/Search_BinhLuanTinTuc${params}`)
    }
}
