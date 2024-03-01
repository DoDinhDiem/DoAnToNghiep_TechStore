import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IAbout } from '../Models/about'

@Injectable({
    providedIn: 'root'
})
export class AboutService {
    constructor(private http: HttpClient) {}

    //Lấy ra about có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/About/GetById_About/' + id)
    }

    //Thêm mới about
    create(About: IAbout) {
        return this.http.post<any>(baseUrl + 'api/About/Create_About', About)
    }

    //Cập nhập about
    update(About: IAbout) {
        return this.http.put<any>(baseUrl + 'api/About/Update_About', About)
    }
    //Xóa 1 about where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/About/Delete_About/' + id)
    }

    //Tìm kiếm & phân trang about
    search(page: number, pageSize: number): Observable<any[]> {
        const params = `?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/About/Search_About${params}`)
    }
}
