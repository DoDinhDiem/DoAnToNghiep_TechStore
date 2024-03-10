import { Component } from '@angular/core'
import { baseUrl } from 'src/app/Api/baseHttp'
import { INhanVien } from 'src/app/Models/nhan-vien'
import { AuthService } from 'src/app/Service/auth.service'
import { NhanVienService } from 'src/app/Service/nhan-vien.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    baseUrl = baseUrl
    public role!: string
    public fullName!: string
    public chucvu!: string
    public email!: string

    constructor(private auth: AuthService, private userStore: UserStoreService, private nhanvienService: NhanVienService) {
        this.chucvu = this.auth.getChucVuFromToken()
        this.email = this.auth.getEmailFromToken()
        this.getByEmail(this.email)
        this.fullName = this.auth.getfullNameFromToken()
        this.role = this.auth.getRoleFromToken()
    }
    ngOnInit() {}

    avatar: any
    getByEmail(email: any) {
        this.nhanvienService.getByEmail(email).subscribe((res) => {
            this.avatar = res
        })
    }

    logout() {
        this.auth.signOut()
    }
}
