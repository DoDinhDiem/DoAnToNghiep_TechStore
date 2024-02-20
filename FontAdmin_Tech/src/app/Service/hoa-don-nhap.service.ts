import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IHoaDonNhap } from '../Models/hoa-don-nhap'

@Injectable({
    providedIn: 'root'
})
export class HoaDonNhapService {
    constructor(private http: HttpClient) {}

    // //Lấy ra tất cả sản phẩm có trạng thái là true
    // getAll(): Observable<any[]> {
    //     return this.http.get<any[]>(baseUrl + 'api/HoaDonNhap/GetAll_HoaDonNhap')
    // }

    //Lấy ra hóa đơn nhập có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/HoaDonNhap/GetById_HoaDonNhap/' + id)
    }

    //Thêm mới hóa đơn nhập
    create(HoaDonNhap: IHoaDonNhap) {
        return this.http.post<any>(baseUrl + 'api/HoaDonNhap/Create_HoaDonNhap', HoaDonNhap)
    }

    //Cập nhập hóa đơn nhập
    update(HoaDonNhap: IHoaDonNhap) {
        return this.http.put<any>(baseUrl + 'api/HoaDonNhap/Update_HoaDonNhap', HoaDonNhap)
    }

    //Tìm kiếm & phân trang hóa đơn nhập
    search(page: number, pageSize: number): Observable<any[]> {
        const params = `?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/HoaDonNhap/Search_HoaDonNhap${params}`)
    }
}
