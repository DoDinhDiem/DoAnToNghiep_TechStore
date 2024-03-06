import { ChangeDetectorRef, Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IKhachHang } from 'src/app/Models/khach-hang'
import { AccountService } from 'src/app/Service/account.service'
import { CheckOutService } from 'src/app/Service/check-out.service'

@Component({
    selector: 'app-profile-account',
    templateUrl: './profile-account.component.html',
    styleUrls: ['./profile-account.component.scss'],
    providers: [MessageService]
})
export class ProfileAccountComponent {
    isDisabled1: boolean = true

    isDisabled2: boolean = true
    isSelectVisible: boolean = false

    isDisabled3: boolean = true
    isDisabled4: boolean = true
    isDisabled5: boolean = true

    constructor(private changeDetectorRef: ChangeDetectorRef, private checkOutService: CheckOutService, private acount: AccountService, private messageService: MessageService) {}

    khachhang: IKhachHang = {}

    email: any
    hoTen: any | undefined
    gioiTinh: any | undefined
    ngaySinh: any | undefined
    diaChi: any | undefined

    ngOnInit() {
        this.email = this.acount.getEmailFromToken()
        this.loadData()
    }

    loadData() {
        this.checkOutService.getByIdKhachHang(this.email).subscribe((data) => {
            this.khachhang = data
        })
    }
    onSubmit() {
        if (this.hoTen != undefined) {
            this.khachhang.hoTen = this.hoTen
        }
        if (this.gioiTinh != undefined) {
            this.khachhang.gioiTinh = this.gioiTinh
        }
        if (this.ngaySinh != undefined) {
            this.khachhang.ngaySinh = this.ngaySinh
        }
        if (this.diaChi != undefined) {
            this.khachhang.diaChi = this.diaChi
        }

        this.checkOutService.updatetKhachHang(this.khachhang).subscribe((res) => {
            this.isDisabled1 = true
            this.isDisabled2 = true
            this.isDisabled3 = true
            this.isDisabled4 = true
            this.hoTen = undefined
            this.gioiTinh = undefined
            this.ngaySinh = undefined
            this.diaChi = undefined
            this.loadData()
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
        })
    }

    dateType: string = 'text'
    enableInput1() {
        this.isDisabled1 = !this.isDisabled1
    }
    enableInput2() {
        this.isDisabled2 = !this.isDisabled2
        this.isSelectVisible = !this.isSelectVisible
    }
    enableInput3() {
        this.isDisabled3 = !this.isDisabled3
        this.dateType = this.dateType === 'text' ? 'date' : 'text'
        this.changeDetectorRef.detectChanges()
    }
    enableInput4() {
        this.isDisabled4 = !this.isDisabled4
    }
}
