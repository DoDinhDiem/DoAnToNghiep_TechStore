import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Observable } from 'rxjs'
import { IAnhTinTuc } from '../Models/anh-tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class AnhTinTucService {
    constructor(private http: HttpClient) {}

    //Lấy ra ảnh tin tức có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/AnhTinTuc/GetById_AnhTinTuc/' + id)
    }

    //Thêm mới ảnh tin tức
    create(AnhTinTuc: IAnhTinTuc) {
        return this.http.post<any>(baseUrl + 'api/AnhTinTuc/Create_AnhTinTuc', AnhTinTuc)
    }

    //Cập nhập ảnh tin tức
    update(AnhTinTuc: IAnhTinTuc) {
        return this.http.put<any>(baseUrl + 'api/AnhTinTuc/Update_AnhTinTuc', AnhTinTuc)
    }

    //Cập nhập trạng thái ảnh tin tức
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/AnhTinTuc/TrangThai/' + id, null)
    }

    //Xóa 1 ảnh tin tức where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/AnhTinTuc/Delete_AnhTinTuc/' + id)
    }

    //Tìm kiếm & phân trang ảnh tin tức
    search(id: number, page: number, pageSize: number): Observable<any[]> {
        const params = `/${id}?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/AnhTinTuc/Search_AnhTinTuc${params}`)
    }

    //Upload ảnh
    uploadFiles(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/AnhTinTuc/Upload_Image', formData)
    }
}
