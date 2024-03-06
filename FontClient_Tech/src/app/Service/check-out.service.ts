import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IKhachHang } from '../Models/khach-hang'
import { Observable } from 'rxjs'
import { baseUrl } from '../Api/baseHttp'
import { IHoaDon } from '../Models/hoa-don'

@Injectable({
    providedIn: 'root'
})
export class CheckOutService {
    constructor(private http: HttpClient) {}

    GetLinkVnpay(hoadon: IHoaDon) {
        return this.http.post<any>(baseUrl + 'api/VNPAY/VnPay', hoadon)
    }

    getByIdKhachHang(email: string) {
        return this.http.get<any>(baseUrl + 'api/Client/GetById_KhachHang/' + email)
    }

    updatetKhachHang(khachhang: any) {
        return this.http.put<any>(baseUrl + 'api/Client/Update_KhachHang', khachhang)
    }

    createHoaDonBan(HoaDonBan: any): Observable<any> {
        return this.http.post<any>(baseUrl + 'api/Client/Create_HoaDonXuat', HoaDonBan)
    }

    createLichSuGiaoDich(LichSuGiaoDich: any) {
        return this.http.post<any>(baseUrl + 'api/Client/Create_LichSuGiaoDich', LichSuGiaoDich)
    }
}
