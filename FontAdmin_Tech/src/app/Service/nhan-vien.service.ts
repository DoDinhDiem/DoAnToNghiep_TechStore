import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { INhanVien } from '../Models/nhan-vien'

@Injectable({
    providedIn: 'root'
})
export class NhanVienService {
    constructor(private http: HttpClient) {}

    //Lấy ra nhân viên có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/NhanVien/GetById_NhanVien/' + id)
    }

    getByEmail(email: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/NhanVien/GetByEmail_NhanVien/' + email)
    }

    //Thêm mới nhân viên
    create(NhanVien: INhanVien) {
        return this.http.post<any>(baseUrl + 'api/NhanVien/Create_NhanVien', NhanVien)
    }

    //Cập nhập nhân viên
    update(NhanVien: INhanVien) {
        return this.http.put<any>(baseUrl + 'api/NhanVien/Update_NhanVien', NhanVien)
    }

    //Cập nhập trạng thái nhân viên
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/NhanVien/TrangThai/' + id, null)
    }

    //Xóa 1 nhân viên where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/NhanVien/Delete_NhanVien/' + id)
    }

    //Tìm kiếm & phân trang nhân viên
    search(key: string, email: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?hoTen=${key}&email=${email}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/NhanVien/Search_NhanVien${params}`)
    }

    uploadFiles(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return this.http.post(baseUrl + 'api/NhanVien/Upload_Image', formData)
    }
}
