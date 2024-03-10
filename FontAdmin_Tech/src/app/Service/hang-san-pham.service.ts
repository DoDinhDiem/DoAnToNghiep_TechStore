import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IHangSanPham } from '../Models/hang-san-pham'

@Injectable({
    providedIn: 'root'
})
export class HangSanPhamService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/HangSanPham/GetAll_HangSanPham')
    }

    //Lấy ra hãng sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/HangSanPham/GetById_HangSanPham/' + id)
    }

    //Thêm mới hãng sản phẩm
    create(HangSanPham: IHangSanPham) {
        return this.http.post<any>(baseUrl + 'api/HangSanPham/Create_HangSanPham', HangSanPham)
    }

    //Cập nhập hãng sản phẩm
    update(HangSanPham: IHangSanPham) {
        return this.http.put<any>(baseUrl + 'api/HangSanPham/Update_HangSanPham', HangSanPham)
    }

    //Cập nhập trạng thái hãng sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/HangSanPham/TrangThai/' + id, null)
    }

    //Xóa 1 hãng sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/HangSanPham/Delete_HangSanPham/' + id)
    }

    //Tìm kiếm & phân trang hãng sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenHang=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/HangSanPham/Search_HangSanPham${params}`)
    }
}
