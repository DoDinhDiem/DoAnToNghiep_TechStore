import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { ISanPham } from '../Models/san-pham'

@Injectable({
    providedIn: 'root'
})
export class SanPhamService {
    constructor(private http: HttpClient) {}

    //Lấy ra tất cả sản phẩm có trạng thái là true
    getAll(): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/SanPham/GetAll_SanPham')
    }

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/SanPham/GetById_SanPham/' + id)
    }

    //Thêm mới loại sản phẩm
    create(SanPham: ISanPham) {
        return this.http.post<any>(baseUrl + 'api/SanPham/Create_SanPham', SanPham)
    }

    //Cập nhập loại sản phẩm
    update(SanPham: ISanPham) {
        return this.http.put<any>(baseUrl + 'api/SanPham/Update_SanPham', SanPham)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/SanPham/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/SanPham/Delete_SanPham/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, giaBanMin: string, giaBanMax: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?tenSanPham=${key}&giaBanMin=${giaBanMin}&giaBanMax=${giaBanMax}&&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/SanPham/Search_SanPham${params}`)
    }

    //Upload ảnh
    uploadFiles(files: File[]): Observable<any> {
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }

        return this.http.post(baseUrl + 'api/SanPham/Upload_Image', formData)
    }

    uploadFileOne(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/SanPham/Upload_Image_One', formData)
    }
}
