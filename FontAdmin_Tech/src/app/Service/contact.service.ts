import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IContact } from '../Models/contact'

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(private http: HttpClient) {}
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Contact/GetById_Contact/' + id)
    }

    //Thêm mới loại sản phẩm
    create(Contact: IContact) {
        return this.http.post<any>(baseUrl + 'api/Contact/Create_Contact', Contact)
    }

    //Cập nhập loại sản phẩm
    update(Contact: IContact) {
        return this.http.put<any>(baseUrl + 'api/Contact/Update_Contact', Contact)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/Contact/Delete_Contact/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(page: number, pageSize: number): Observable<any[]> {
        const params = `?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Contact/Search_Contact${params}`)
    }
}
