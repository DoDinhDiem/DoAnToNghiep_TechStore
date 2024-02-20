import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IChucVu } from '../Models/chuc-vu'

@Injectable({
    providedIn: 'root'
})
export class ChucVuService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/ChucVu/GetAll_ChucVu')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/ChucVu/GetById_ChucVu/' + id)
    }

    //Thêm mới loại sản phẩm
    create(ChucVu: IChucVu) {
        return this.http.post<any>(baseUrl + 'api/ChucVu/Create_ChucVu', ChucVu)
    }

    //Cập nhập loại sản phẩm
    update(ChucVu: IChucVu) {
        return this.http.put<any>(baseUrl + 'api/ChucVu/Update_ChucVu', ChucVu)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/ChucVu/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/ChucVu/Delete_ChucVu/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenLoai=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/ChucVu/Search_ChucVu${params}`)
    }
}
