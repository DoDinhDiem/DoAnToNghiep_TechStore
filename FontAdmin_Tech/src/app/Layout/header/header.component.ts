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
    public fullName: string = ''
    public chucvu: string = ''
    public email: string = ''

    constructor(private auth: AuthService, private userStore: UserStoreService, private nhanvienService: NhanVienService) {}
    ngOnInit() {
        this.userStore.getFullNameFromStore().subscribe((val) => {
            const fullNameFromToken = this.auth.getfullNameFromToken()
            this.fullName = val || fullNameFromToken
        })

        this.userStore.getRoleFromStore().subscribe((val) => {
            const roleFromToken = this.auth.getRoleFromToken()
            this.role = val || roleFromToken
        })

        this.userStore.getChucVuFromStore().subscribe((val) => {
            const roleFromToken = this.auth.getChucVuFromToken()
            this.chucvu = val || roleFromToken
        })
        this.userStore.getEmailFromStore().subscribe((val) => {
            const roleFromToken = this.auth.getEmailFromToken()
            this.email = val || roleFromToken
            this.getByEmail(this.email)
        })
    }

    avatar: any
    getByEmail(email: any) {
        this.nhanvienService.getByEmail(email).subscribe((res) => {
            this.userStore.setIdForStore(res.id)
            this.avatar = res.avatar
        })
    }

    logout() {
        this.auth.signOut()
    }
}
