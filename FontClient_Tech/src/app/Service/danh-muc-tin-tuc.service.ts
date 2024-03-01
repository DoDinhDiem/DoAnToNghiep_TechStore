import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class DanhMucTinTucService {
    constructor(private http: HttpClient) {}

    GetTinTucByLoai(id: any, page: any, pageSize: any): Observable<any[]> {
        const params = `?id=${id}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Client/GetTinTucByLoai${params}`)
    }
}
