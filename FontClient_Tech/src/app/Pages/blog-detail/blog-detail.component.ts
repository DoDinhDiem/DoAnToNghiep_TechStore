import { Component, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { baseUrl } from 'src/app/Api/baseHttp'
import { ChiTietTinTucService } from 'src/app/Service/chi-tiet-tin-tuc.service'
import { HeThongService } from 'src/app/Service/he-thong.service'
import * as moment from 'moment'
import { IBinhLuanTinTuc } from 'src/app/Models/binh-luan-tin-tuc'
import { MessageService } from 'primeng/api'
import { IPhanHoiBinhLuan } from 'src/app/Models/phan-hoi-tin-tuc'

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss'],
    providers: [MessageService]
})
export class BlogDetailComponent {
    @ViewChild('replyForm') replyForm!: ElementRef

    baseUrl = baseUrl

    constructor(private chiTietTinTucService: ChiTietTinTucService, private heThongService: HeThongService, private route: ActivatedRoute, private messageService: MessageService) {
        this.replyVisibility = {}
    }

    replyVisibility: { [key: number]: boolean } = {}
    binhLuanId: any
    toggleReplyVisibility(id: number) {
        this.binhLuanId = id
        for (const key in this.replyVisibility) {
            if (Object.prototype.hasOwnProperty.call(this.replyVisibility, key)) {
                this.replyVisibility[key] = false
            }
        }

        this.replyVisibility[id] = !this.replyVisibility[id]
        if (this.replyVisibility[id]) {
            setTimeout(() => {
                this.replyForm.nativeElement.focus()
            })
        }
    }
    id!: any
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
            this.GetChiTietTinTuc()
            this.GetLoaiTinTuc()
            this.GetBinhLuanTinTuc()
        })
    }

    tinTuc: any
    GetChiTietTinTuc() {
        this.chiTietTinTucService.GetChiTietTinTuc(this.id).subscribe((data) => {
            this.tinTuc = data
            this.GetTinTucLienQuan(this.id, data.danhMucId)
        })
    }

    danhmuc: any[] = []
    GetLoaiTinTuc() {
        this.heThongService.GetLoaiTinTuc().subscribe((data) => {
            this.danhmuc = data
        })
    }

    tuongtu: any[] = []
    GetTinTucLienQuan(id: any, loai: any) {
        this.chiTietTinTucService.GetTinTucLienQuan(id, loai).subscribe((data) => {
            this.tuongtu = data
        })
    }

    binhLuan: any
    binhLuanTotal!: number
    GetBinhLuanTinTuc() {
        this.chiTietTinTucService.GetBinhLuanTinTuc(this.id).subscribe((data: any) => {
            this.binhLuan = data.items
            this.binhLuanTotal = data.totalItems
            this.GetPhanHoiBinhLuan(this.id)
        })
    }

    phanhoi: any
    GetPhanHoiBinhLuan(id: any) {
        this.chiTietTinTucService.GetPhanHoiBinhLuan(id).subscribe((data) => {
            this.phanhoi = data
        })
    }

    comment: IBinhLuanTinTuc = {}
    saveComment() {
        this.comment.tinTucId = this.id
        this.comment.khachHangId = 1
        this.comment.trangThai = true
        this.chiTietTinTucService.create(this.comment).subscribe((res) => {
            this.GetBinhLuanTinTuc()
            this.comment = {}
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
        })
    }

    response: IPhanHoiBinhLuan = {}
    saveResponse() {
        this.response.tinTucId = this.id
        this.response.binhLuanId = this.binhLuanId
        this.response.khachHangId = 1
        this.response.trangThai = true
        this.chiTietTinTucService.createPhanHoi(this.response).subscribe((res) => {
            this.GetBinhLuanTinTuc()
            this.replyVisibility[this.binhLuanId] = false
            this.response = {}
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
        })
    }

    //Set time
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
}
