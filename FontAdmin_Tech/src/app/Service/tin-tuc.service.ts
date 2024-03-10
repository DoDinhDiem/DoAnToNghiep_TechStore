import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { ITinTuc } from '../Models/tin-tuc'

@Injectable({
    providedIn: 'root'
})
export class TinTucService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/TinTuc/GetAll_TinTuc')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/TinTuc/GetById_TinTuc/' + id)
    }

    //Thêm mới loại sản phẩm
    create(TinTuc: ITinTuc) {
        return this.http.post<any>(baseUrl + 'api/TinTuc/Create_TinTuc', TinTuc)
    }

    //Cập nhập loại sản phẩm
    update(TinTuc: ITinTuc) {
        return this.http.put<any>(baseUrl + 'api/TinTuc/Update_TinTuc', TinTuc)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/TinTuc/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/TinTuc/Delete_TinTuc/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tieuDe=${key}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/TinTuc/Search_TinTuc${params}`)
    }

    //Upload ảnh
    // uploadFiles(files: File[]): Observable<any> {
    //     const formData = new FormData()

    //     for (let i = 0; i < files.length; i++) {
    //         formData.append('files', files[i])
    //     }

    //     return this.http.post(baseUrl + 'api/TinTuc/Upload_Image', formData)
    // }
    uploadFiles(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/TinTuc/Upload_Image', formData)
    }
}
