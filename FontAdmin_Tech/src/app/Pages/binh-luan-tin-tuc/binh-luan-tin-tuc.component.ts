import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { IBinhLuanTinTuc } from 'src/app/Models/binh-luan-tin-tuc'
import { BinhLuanTinTucService } from 'src/app/Service/binh-luan-tin-tuc.service'
import { PhanHoiBinhLuanTinTucService } from 'src/app/Service/phan-hoi-binh-luan-tin-tuc.service'
import { IPhanHoiBinhLuanTinTuc } from 'src/app/Models/phan-hoi-binh-luan-tin-tuc'
import * as moment from 'moment'
import { AuthService } from 'src/app/Service/auth.service'

@Component({
    selector: 'app-binh-luan-tin-tuc',
    templateUrl: './binh-luan-tin-tuc.component.html',
    styleUrls: ['./binh-luan-tin-tuc.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class BinhLuanTinTucComponent implements OnInit {
    baseUrl = baseUrl
    isCommentBoxVisible: boolean = false

    binhluanID: number
    toggleCommentBox(id: number) {
        this.binhluanID = id
        this.isCommentBoxVisible = true
    }

    closeCommentBox() {
        this.binhluanID = null
        this.phanhoi = {}
        this.isCommentBoxVisible = false
    }

    title = 'Bình luận tin tức'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    binhLuan: IBinhLuanTinTuc = {}
    binhLuanList: any

    //Gọi constructor
    constructor(
        private phanHoiService: PhanHoiBinhLuanTinTucService,
        private binhLuanTinTucService: BinhLuanTinTucService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private auth: AuthService
    ) {}

    id!: any
    //Gọi chạy cùng component
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
        })
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.binhLuan = {}
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.binhLuan = {}
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.binhLuanTinTucService.search(this.id, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.binhLuanList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(binhLuan: IBinhLuanTinTuc) {
        this.binhLuanTinTucService.updateTrangThai(binhLuan.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(binhLuan: IBinhLuanTinTuc) {
        this.binhLuanTinTucService.getById(binhLuan.id).subscribe((data) => {
            this.binhLuan = data
            this.visible = true
            this.LayAllPhanHoi(data.id)
            this.Save = 'Cập nhập'
        })
    }

    phanhoi: IPhanHoiBinhLuanTinTuc = {}
    phanHoiList: any[] = []
    LayAllPhanHoi(id: any) {
        this.phanHoiService.getAll(id).subscribe((data) => {
            this.phanHoiList = data
        })
    }

    onSubmit() {
        this.phanhoi.tinTucId = this.id
        this.phanhoi.binhLuanId = this.binhluanID
        this.phanhoi.nhanVienId = this.auth.getIdFromToken()
        this.phanhoi.trangThai = true
        this.phanHoiService.create(this.phanhoi).subscribe((res) => {
            this.LayAllPhanHoi(this.binhLuan.id)
            this.closeCommentBox()
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
        })
    }

    getTimeAgo(createdAt?: string) {
        if (!createdAt) {
            return ''
        }
        const currentTime = moment()
        const createdAtTime = moment(createdAt)
        const diffSeconds = currentTime.diff(createdAtTime, 'seconds')

        if (diffSeconds < 60) {
            const timePhanHoi = 'Vừa xong'
            return timePhanHoi
        } else {
            const diffMinutes = currentTime.diff(createdAtTime, 'minutes')
            if (diffMinutes < 60) {
                const timePhanHoi = `${diffMinutes} phút trước`
                return timePhanHoi
            } else {
                const diffHours = currentTime.diff(createdAtTime, 'hours')
                if (diffHours < 24) {
                    const timePhanHoi = `${Math.floor(diffHours)} giờ trước`
                    return timePhanHoi
                } else {
                    const diffDays = currentTime.diff(createdAtTime, 'days')
                    if (diffDays < 30) {
                        const timePhanHoi = `${diffDays} ngày trước`
                        return timePhanHoi
                    } else {
                        const timePhanHoi = createdAtTime.format('DD/MM/YYYY')
                        return timePhanHoi
                    }
                }
            }
        }
    }
    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    key: any = ''
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
        if (!this.binhLuanList || !this.binhLuanList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.binhLuanList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.binhLuanList?.totalItems) {
            return this.binhLuanList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
