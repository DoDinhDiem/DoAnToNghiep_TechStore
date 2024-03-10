import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { baseUrl } from '../Api/baseHttp'
import { Observable } from 'rxjs'
import { IMaGiamActive } from '../Models/ma-giam-active'

@Injectable({
    providedIn: 'root'
})
export class MaGiamGiaService {
    constructor(private http: HttpClient) {}

    GetMaGiamGia(email: string): Observable<any[]> {
        return this.http.get<any[]>(baseUrl + 'api/Client/MaGiamGia/' + email)
    }

    storeDiscount(discount: any) {
        const discountString = JSON.stringify(discount)
        localStorage.setItem('discount', discountString)
    }

    getDiscount() {
        return JSON.parse(localStorage.getItem('discount') as any)
    }
    clearDiscount() {
        localStorage.removeItem('discount')
    }
    create(MaGiamActive: IMaGiamActive): Observable<any> {
        return this.http.post<any>(baseUrl + 'api/Client/Create_MaGiamActive', MaGiamActive)
    }
}
