import { Component } from '@angular/core'
import { AccountService } from 'src/app/Service/account.service'
import { CheckOutService } from 'src/app/Service/check-out.service'
import { ProfileService } from 'src/app/Service/profile.service'

@Component({
    selector: 'app-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent {
    constructor(private checkOutService: CheckOutService, private profileService: ProfileService, private accountService: AccountService) {}

    chitietList: any

    name = this.accountService.getfullNameFromToken()
    ngOnInit() {
        this.loadData()
    }

    totalAmount: number = 0
    date: any
    loadData() {
        this.profileService.getLichSuMuaHang(this.email, this.trangThai, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
            this.chitietList = data.totalItems
        })
        this.checkOutService.getByIdKhachHang(this.email).subscribe((data) => {
            this.date = data.createdAt
        })
    }

    //Khai báo key, page, pageSize
    email = this.accountService.getEmailFromToken()
    trangThai: any = ''
    currentPage: number = 1
    selectedPageSize: number = 10

    //Khi pageSize thay đổi
    onPageSizeChange() {
        this.loadData()
    }

    //Khi thay đổi page
    onPageChange(page: number) {
        this.currentPage = page
        this.loadData()
    }

    //Back khi phân trang
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            this.loadData()
        }
    }

    //Next phân trang
    onNextPage() {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++
            this.loadData()
        }
    }

    //Tình số page
    getPageCount(): number {
        if (!this.chitietList || !this.chitietList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.chitietList.totalItems / this.selectedPageSize)
    }

    //Hiển thị page
    getPageNumbers(): number[] {
        const pageCount = this.getPageCount()
        if (pageCount <= 0) {
            return []
        }
        return Array(pageCount)
            .fill(0)
            .map((x, i) => i + 1)
    }

    //Hiển thị từ
    getStartIndex(): number {
        return (this.currentPage - 1) * this.selectedPageSize + 1
    }

    //Hiển thị đến
    getEndIndex(): number {
        if (this.selectedPageSize >= this.chitietList?.totalItems) {
            return this.chitietList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }
}
