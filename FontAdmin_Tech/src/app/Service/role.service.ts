import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IRole } from '../Models/role'

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Role/GetAll_Role')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Role/GetById_Role/' + id)
    }

    //Thêm mới loại sản phẩm
    create(Role: IRole) {
        return this.http.post<any>(baseUrl + 'api/Role/Create_Role', Role)
    }

    //Cập nhập loại sản phẩm
    update(Role: IRole) {
        return this.http.put<any>(baseUrl + 'api/Role/Update_Role', Role)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/Role/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/Role/Delete_Role/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenRole=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Role/Search_Role${params}`)
    }
}
