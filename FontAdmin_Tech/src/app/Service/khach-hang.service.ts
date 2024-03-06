import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'

@Injectable({
    providedIn: 'root'
})
export class KhachHangService {
    constructor(private http: HttpClient) {}

    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/KhachHang/TrangThai/' + id, null)
    }

    search(key: string, email: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenLoai=${key}&email=${email}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/KhachHang/Search_KhachHang${params}`)
    }
}
