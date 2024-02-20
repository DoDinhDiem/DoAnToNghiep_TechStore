import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { ILoaiSanPham } from '../Models/loai-san-pham'

@Injectable({
    providedIn: 'root'
})
export class LoaiSanPhamService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/LoaiSanPham/GetAll_LoaiSanPham')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/LoaiSanPham/GetById_LoaiSanPham/' + id)
    }

    //Thêm mới loại sản phẩm
    create(LoaiSanPham: ILoaiSanPham) {
        return this.http.post<any>(baseUrl + 'api/LoaiSanPham/Create_LoaiSanPham', LoaiSanPham)
    }

    //Cập nhập loại sản phẩm
    update(LoaiSanPham: ILoaiSanPham) {
        return this.http.put<any>(baseUrl + 'api/LoaiSanPham/Update_LoaiSanPham', LoaiSanPham)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/LoaiSanPham/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/LoaiSanPham/Delete_LoaiSanPham/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenLoai=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/LoaiSanPham/Search_LoaiSanPham${params}`)
    }
}
