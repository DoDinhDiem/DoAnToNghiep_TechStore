import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IAnhSanPham } from '../Models/anh-san-pham'

@Injectable({
    providedIn: 'root'
})
export class AnhSanPhamService {
    constructor(private http: HttpClient) {}

    //Lấy ra ảnh sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/AnhSanPham/GetById_AnhSanPham/' + id)
    }

    //Thêm mới ảnh sản phẩm
    create(AnhSanPham: IAnhSanPham) {
        return this.http.post<any>(baseUrl + 'api/AnhSanPham/Create_AnhSanPham', AnhSanPham)
    }

    //Cập nhập ảnh sản phẩm
    update(AnhSanPham: IAnhSanPham) {
        return this.http.put<any>(baseUrl + 'api/AnhSanPham/Update_AnhSanPham', AnhSanPham)
    }

    //Cập nhập trạng thái ảnh sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/AnhSanPham/TrangThai/' + id, null)
    }

    //Xóa 1 ảnh sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/AnhSanPham/Delete_AnhSanPham/' + id)
    }

    //Tìm kiếm & phân trang ảnh sản phẩm
    search(id: number, page: number, pageSize: number): Observable<any[]> {
        const params = `/${id}?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/AnhSanPham/Search_AnhSanPham${params}`)
    }

    //Upload ảnh
    uploadFiles(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/AnhSanPham/Upload_Image', formData)
    }
}
