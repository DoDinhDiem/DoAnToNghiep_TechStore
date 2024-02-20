import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { ISlide } from '../Models/slide'

@Injectable({
    providedIn: 'root'
})
export class SlideService {
    constructor(private http: HttpClient) {}

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/Slide/GetById_Slide/' + id)
    }

    //Thêm mới loại sản phẩm
    create(Slide: ISlide) {
        return this.http.post<any>(baseUrl + 'api/Slide/Create_Slide', Slide)
    }

    //Cập nhập loại sản phẩm
    update(Slide: ISlide) {
        return this.http.put<any>(baseUrl + 'api/Slide/Update_Slide', Slide)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/Slide/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/Slide/Delete_Slide/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(key: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/Slide/Search_Slide${params}`)
    }

    //Upload ảnh
    uploadFiles(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/Slide/Upload_Image', formData)
    }
}
