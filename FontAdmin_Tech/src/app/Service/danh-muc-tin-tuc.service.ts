import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IDanhMucTinTuc } from '../Models/danh-muc-tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class DanhMucTinTucService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/DanhMucTinTuc/GetAll_DanhMucTinTuc')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/DanhMucTinTuc/GetById_DanhMucTinTuc/' + id)
    }

    //Thêm mới loại sản phẩm
    create(DanhMucTinTuc: IDanhMucTinTuc) {
        return this.http.post<any>(baseUrl + 'api/DanhMucTinTuc/Create_DanhMucTinTuc', DanhMucTinTuc)
    }

    //Cập nhập loại sản phẩm
    update(DanhMucTinTuc: IDanhMucTinTuc) {
        return this.http.put<any>(baseUrl + 'api/DanhMucTinTuc/Update_DanhMucTinTuc', DanhMucTinTuc)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/DanhMucTinTuc/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/DanhMucTinTuc/Delete_DanhMucTinTuc/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenLoai=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/DanhMucTinTuc/Search_DanhMucTinTuc${params}`)
    }
}
