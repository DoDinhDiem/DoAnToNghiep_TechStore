import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IMaGiamGia } from '../Models/ma-giam-gia'

@Injectable({
    providedIn: 'root'
})
export class MaGiamGiaService {
    constructor(private http: HttpClient) {}

    //Lấy ra loại sản phẩm có where với id
    getById(id: any): Observable<any> {
        return this.http.get<any>(baseUrl + 'api/MaGiamGia/GetById_MaGiamGia/' + id)
    }

    //Thêm mới loại sản phẩm
    create(MaGiamGia: IMaGiamGia) {
        return this.http.post<any>(baseUrl + 'api/MaGiamGia/Create_MaGiamGia', MaGiamGia)
    }

    //Cập nhập loại sản phẩm
    update(MaGiamGia: IMaGiamGia) {
        return this.http.put<any>(baseUrl + 'api/MaGiamGia/Update_MaGiamGia', MaGiamGia)
    }

    //Cập nhập trạng thái loại sản phẩm
    updateTrangThai(id: any): Observable<any> {
        return this.http.put<any>(baseUrl + 'api/MaGiamGia/TrangThai/' + id, null)
    }

    //Xóa 1 loại sản phẩm where id
    delete(id: any): Observable<any> {
        return this.http.delete<any>(baseUrl + 'api/MaGiamGia/Delete_MaGiamGia/' + id)
    }

    //Tìm kiếm & phân trang loại sản phẩm
    search(maGiamGia: string, page: number, pageSize: number): Observable<any[]> {
        const params = `?maGiamGia=${maGiamGia}&page=${page}&pageSize=${pageSize}`
        return this.http.get<any[]>(baseUrl + `api/MaGiamGia/Search_MaGiamGia${params}`)
    }
}
