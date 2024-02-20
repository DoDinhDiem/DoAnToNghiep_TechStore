import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IThongSoSanPham } from '../Models/thong-so-san-pham'

@Injectable({
    providedIn: 'root'
})
export class ThongSoSanPhamService {
    constructor(private http: HttpClient) {}

    //Lấy ra thông số sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/ThongSo/GetById_ThongSoSanPham/' + id)
    }

    //Thêm mới thông số sản phẩm
    create(ThongSoSanPham: IThongSoSanPham) {
        return this.http.post<any>(baseUrl + 'api/ThongSo/Create_ThongSoSanPham', ThongSoSanPham)
    }

    //Cập nhập thông số sản phẩm
    update(ThongSoSanPham: IThongSoSanPham) {
        return this.http.put<any>(baseUrl + 'api/ThongSo/Update_ThongSoSanPham', ThongSoSanPham)
    }

    //Cập nhập trạng thái thông số sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/ThongSo/TrangThai/' + id, null)
    }

    //Xóa 1 thông số sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/ThongSo/Delete_ThongSoSanPham/' + id)
    }

    //Tìm kiếm & phân trang thông số sản phẩm
    search(id: number, key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `/${id}?tenThongSo=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/ThongSo/Search_ThongSoSanPham${params}`)
    }
}
