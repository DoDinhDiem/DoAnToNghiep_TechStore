import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IPhanHoiBinhLuanTinTuc } from '../Models/phan-hoi-binh-luan-tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class PhanHoiBinhLuanTinTucService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(id: any): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/PhanHoiBinhLuanTinTuc/GetAll_PhanHoiBinhLuan/' + id)
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/PhanHoiBinhLuanTinTuc/GetById_PhanHoiBinhLuan/' + id)
    }

    //Thêm mới loại sản phẩm
    create(PhanHoiBinhLuan: IPhanHoiBinhLuanTinTuc) {
        return this.http.post<any>(baseUrl + 'api/PhanHoiBinhLuanTinTuc/Create_PhanHoiBinhLuan', PhanHoiBinhLuan)
    }

    //Cập nhập loại sản phẩm
    update(PhanHoiBinhLuan: IPhanHoiBinhLuanTinTuc) {
        return this.http.put<any>(baseUrl + 'api/PhanHoiBinhLuanTinTuc/Update_PhanHoiBinhLuan', PhanHoiBinhLuan)
    }
}
