import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IHoaDonXuat } from 'src/app/Models/hoa-don-xuat'
import { HoaDonXuatService } from 'src/app/Service/hoa-don-xuat.service'

@Component({
    selector: 'app-hoa-don-xuat',
    templateUrl: './hoa-don-xuat.component.html',
    styleUrls: ['./hoa-don-xuat.component.scss'],
    providers: [MessageService]
})
export class HoaDonXuatComponent {
    title = 'Hóa đơn xuất'
    visible_edit: boolean = false

    constructor(private hoaDonXuatService: HoaDonXuatService, private messageService: MessageService) {}

    hoadonxuat!: IHoaDonXuat
    hoadonxuatList: any
    ngOnInit() {
        this.loadData()
    }
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.hoaDonXuatService.search(this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.hoadonxuatList = data
                this.showSkeleton = false
                console.log(data)
            })
        }, 2000)
    }
    closeDialog() {
        this.visible_edit = false
    }
    editModal(hoaDon: IHoaDonXuat) {
        this.hoaDonXuatService.getById(hoaDon.id).subscribe((data) => {
            this.hoadonxuat = data.hoaDons
            this.visible_edit = true
            console.log(this.hoadonxuat)
        })
    }
    hoadonDetail!: any
    chiTietHoaDon!: any
    showDetail(hoaDon: IHoaDonXuat) {
        this.hoaDonXuatService.getById(hoaDon.id).subscribe((data) => {
            this.hoadonDetail = data.hoaDons
            this.chiTietHoaDon = data.chiTiet
            console.log(this.hoadonDetail)
            console.log(this.chiTietHoaDon)
        })
    }

    onSubmit() {}

    //Khai báo key, page, pageSize
    currentPage: number = 1
    pageSizes: number[] = [10, 20, 30, 40]
    selectedPageSize: number = 10

    //Tìm kiếm
    onKeywordInput() {
        this.loadData()
    }
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
        if (!this.hoadonxuatList || !this.hoadonxuatList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.hoadonxuatList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.hoadonxuatList?.totalItems) {
            return this.hoadonxuatList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
