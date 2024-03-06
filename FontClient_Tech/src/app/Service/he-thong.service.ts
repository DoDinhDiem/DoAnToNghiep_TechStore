import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IFeedBack } from '../Models/feed-back'

@Injectable({
    providedIn: 'root'
})
export class HeThongService {
    constructor(private http: HttpClient) {}

    GetLoaiSanPham(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetLoaiSanPham')
    }

    GetSearchSanPham(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?key=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Client/GetSearchSanPham${params}`)
    }

    GetLoaiTinTuc(): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Client/GetLoaiTinTuc')
    }

    GetGioiThieu(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/Client/GetGioiThieu')
    }

    GetLienHe(): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Client/GetLienHe')
    }

    CreateFeed(feedback: IFeedBack) {
        return this.http.post<any>(baseUrl + 'api/Client/Create_FeedBack', feedback)
    }
}
