import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IHoaDonXuat } from '../Models/hoa-don-xuat'

@Injectable({
    providedIn: 'root'
})
export class HoaDonXuatService {
    constructor(private http: HttpClient) {}

    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/HoaDonXuat/GetById_HoaDonXuat/' + id)
    }

    //Cập nhập hóa đơn nhập
    update(HoaDonXuat: IHoaDonXuat) {
        return this.http.put<any>(baseUrl + 'api/HoaDonXuat/Update_HoaDonXuat', HoaDonXuat)
    }

    //Tìm kiếm & phân trang hóa đơn nhập
    search(trangThai: number, page: number, pageSize: number): Observable<any[]> {
        const params = `?trangThai=${trangThai}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/HoaDonXuat/Search_HoaDonXuat${params}`)
    }
}
