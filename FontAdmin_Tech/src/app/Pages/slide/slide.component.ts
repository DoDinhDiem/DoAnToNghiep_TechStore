import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { ISlide } from 'src/app/Models/slide'
import { SlideService } from 'src/app/Service/slide.service'

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SlideComponent {
    baseUrl = baseUrl
    //title
    title = 'Ảnh slide'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    slide!: ISlide
    slideList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(private slideService: SlideService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.slide = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.slide = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.slideService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.slideList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(slide: ISlide) {
        this.slideService.updateTrangThai(slide.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(slide: ISlide) {
        this.slideService.getById(slide.id).subscribe((data) => {
            this.slide = data
            this.fileOnly = { name: data.image }
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (this.slide.trangThai == undefined) {
            this.slide.trangThai = false
        }

        if (this.fileOnly) {
            this.slide.image = this.fileOnly.name
        }
        if (this.fileSelected) {
            this.onUpload()
            this.fileSelected = false
        }

        if (this.slide.image) {
            if (this.slide.id) {
                this.slideService.update(this.slide).subscribe({
                    next: (res) => {
                        this.loadData()
                        this.closeDialog()
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                    },
                    error: (err) => {
                        this.loadData()
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                    }
                })
            } else {
                this.slideService.create(this.slide).subscribe({
                    next: (res) => {
                        this.loadData()
                        this.closeDialog()
                        this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                    }
                })
            }
        }
    }

    //Xóa 1 loại sản phẩm
    delete(slide: ISlide) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa không ?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.slideService.delete(slide.id).subscribe((res) => {
                    this.loadData()

                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
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
        if (!this.slideList || !this.slideList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.slideList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.slideList?.totalItems) {
            return this.slideList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false

    //Upload file
    fileOnly: any
    sequenceNumber = 0
    fileSelected: boolean = false

    onFileOnly(event: any) {
        const files: FileList = event.target.files
        if (files.length > 0) {
            this.fileSelected = true
            const file = files[0]
            const newName = this.generateNewFileName(file.name)
            this.fileOnly = new File([file], newName, { type: file.type })
        } else {
            this.fileSelected = false
        }
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime()
        const extension = oldFileName.split('.').pop()
        const newFileName = `slides_${timestamp}.${extension}`
        return newFileName
    }

    onUpload() {
        this.slideService.uploadFiles(this.fileOnly).subscribe()
    }
}
