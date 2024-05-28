import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { IEmailRequest } from 'src/app/Models/email-request'
import { IFeedBack } from 'src/app/Models/feed-back'
import { FeedBackService } from 'src/app/Service/feed-back.service'

@Component({
    selector: 'app-feed-back',
    templateUrl: './feed-back.component.html',
    styleUrls: ['./feed-back.component.scss'],
    providers: [MessageService]
})
export class FeedBackComponent {
    title = 'FeedBack'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    feedback!: IFeedBack
    feedbackList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(private feedBackService: FeedBackService, private messageService: MessageService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.feedBackService.search(this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.feedbackList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(feedback: IFeedBack) {
        this.feedBackService.updateTrangThai(feedback.id).subscribe((res) => {
            this.loadData()
        })
    }

    emailRequest: IEmailRequest = {}
    //Gọi mở sửa dialog
    editModal(feedback: IFeedBack) {
        this.feedBackService.getById(feedback.id).subscribe((data) => {
            this.feedback = data
            this.emailRequest.to = data.email
            this.submitted = false
        })
    }

    onSubmit() {
        this.submitted = true
        if (this.emailRequest.subject && this.emailRequest.content) {
            this.feedBackService.SendEmail(this.emailRequest).subscribe({
                next: (data) => {
                    if (this.feedback.trangThai == false) {
                        this.trangThai(this.feedback)
                    }
                    this.emailRequest = {}
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: data.message })
                },
                error: (err) => {
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Lỗi' })
                }
            })
        }
    }

    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

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
        if (!this.feedbackList || !this.feedbackList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.feedbackList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.feedbackList?.totalItems) {
            return this.feedbackList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
