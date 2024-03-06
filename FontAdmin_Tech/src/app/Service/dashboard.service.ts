import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getCountDonHang() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountDonHang')
    }

    getCountDoanhThu() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountDoanhThu')
    }

    getCountSanPham() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountSanPham')
    }

    getCountKhachHang() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountKhachHang')
    }

    getCountTinTuc() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountTinTuc')
    }

    getCountNhanVien() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/CountNhanVien')
    }

    getThongKeTheoThang(year: any) {
        return this.http.get<any>(baseUrl + 'api/DashBoard/ThongKeTheoThang/' + year)
    }

    getThongKeTheoTuanHienTai() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/ThongKeTheoNgayTrongTuan')
    }

    getThongKeTheoNgayTrongTuanTruoc() {
        return this.http.get<any>(baseUrl + 'api/DashBoard/ThongKeTheoNgayTrongTuanTruoc')
    }

    GetSanPhamBanChay(): Observable<any[]> {
        return this.http.get<any>(baseUrl + 'api/DashBoard/GetSanPhamBanChay')
    }
}
