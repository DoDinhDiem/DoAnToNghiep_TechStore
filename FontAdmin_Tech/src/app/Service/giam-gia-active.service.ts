import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'

@Injectable({
    providedIn: 'root'
})
export class GiamGiaActiveService {
    constructor(private http: HttpClient) {}

    search(id: number, page: number, pageSize: number): Observable<any[]> {
        const params = `?id=${id}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/MaGiamActive/Search_MaGiamActive${params}`)
    }
}
