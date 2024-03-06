import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IEmailRequest } from '../Models/email-request'

@Injectable({
    providedIn: 'root'
})
export class FeedBackService {
    constructor(private http: HttpClient) {}

    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/FeedBack/GetById_FeedBack/' + id)
    }

    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/FeedBack/TrangThai/' + id, null)
    }

    SendEmail(emailRequest: IEmailRequest) {
        return this.http.post<any>(baseUrl + 'api/FeedBack/SendEmail', emailRequest)
    }

    search(page: number, pageSize: number): Observable<any[]> {
        const params = `?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/FeedBack/Search_FeedBack${params}`)
    }
}
