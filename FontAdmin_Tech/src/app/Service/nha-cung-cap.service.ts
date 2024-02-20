import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { INhaCungCap } from '../Models/nha-cung-cap'

@Injectable({
    providedIn: 'root'
})
export class NhaCungCapService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/NhaCungCap/GetAll_NhaCungCap')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/NhaCungCap/GetById_NhaCungCap/' + id)
    }

    //Thêm mới loại sản phẩm
    create(NhaCungCap: INhaCungCap) {
        return this.http.post<any>(baseUrl + 'api/NhaCungCap/Create_NhaCungCap', NhaCungCap)
    }

    //Cập nhập loại sản phẩm
    update(NhaCungCap: INhaCungCap) {
        return this.http.put<any>(baseUrl + 'api/NhaCungCap/Update_NhaCungCap', NhaCungCap)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/NhaCungCap/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/NhaCungCap/Delete_NhaCungCap/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenLoai=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/NhaCungCap/Search_NhaCungCap${params}`)
    }
}
