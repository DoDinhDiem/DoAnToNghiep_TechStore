import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { ITinTuc } from 'src/app/Models/tin-tuc'
import { AuthService } from 'src/app/Service/auth.service'
import { DanhMucTinTucService } from 'src/app/Service/danh-muc-tin-tuc.service'
import { TinTucService } from 'src/app/Service/tin-tuc.service'
import * as moment from 'moment'
import { ExcelService } from 'src/app/Service/excel.service'

@Component({
    selector: 'app-tin-tuc',
    templateUrl: './tin-tuc.component.html',
    styleUrls: ['./tin-tuc.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class TinTucComponent {
    baseUrl = baseUrl
    //title
    title = 'Tin tức'

    //Khai báo true/false cho dialog
    visible: boolean = false
    visible_look: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    tintuc!: ITinTuc
    tintucList: any

    //select và hiển ở table của
    danhmuc: any[] = []

    submitted: boolean = false

    //Gọi constructor
    constructor(
        private tinTucService: TinTucService,
        private danhMucSanPhamService: DanhMucTinTucService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private auth: AuthService,
        private excelService: ExcelService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.tintuc = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.fileOnly = {}
        this.tintuc = {}
        this.submitted = false
    }

    closeSeeDialog() {
        this.visible_look = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true

        this.danhMucSanPhamService.getAll().subscribe((data) => {
            this.danhmuc = data.map((item) => ({
                id: item.id,
                name: item.tenDanhMuc
            }))
        })
        setTimeout(() => {
            this.tinTucService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data: any) => {
                this.tintucList = data
                this.loaiXlsx = data.items
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(tintuc: ITinTuc) {
        this.tinTucService.updateTrangThai(tintuc.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    fileOnlyEdit: any | undefined
    selectedFilesEdit: any[] | undefined
    editModal(tintuc: ITinTuc) {
        this.tinTucService.getById(tintuc.id).subscribe((data) => {
            this.tintuc = data.tinTuc
            this.fileOnly = { name: data.image }
            console.log(data)
            // this.selectedFiles = data.anhTinTuc.map((item: any) => ({ name: item.image }))
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    // tintucDetail: any
    // image: any
    // nguoiViet: any
    // showSeeDialog(tintuc: ITinTuc) {
    //     this.tinTucService.getById(tintuc.id).subscribe((data) => {
    //         console.log(data)
    //         this.tintucDetail = data.tinTuc
    //         this.image = data.image
    //         this.nguoiViet = data.tenNguoiViet
    //         this.visible_look = true
    //     })
    // }

    onSubmit() {
        this.submitted = true

        if (this.tintuc.trangThai == undefined) {
            this.tintuc.trangThai = false
        }

        //Ảnh sản phẩm
        this.tintuc.anhTinTucs = []
        //Một ảnh
        if (this.fileOnly) {
            const file = this.fileOnly
            const img = {
                image: file.name,
                trangThai: true
            }
            this.tintuc.anhTinTucs.push(img)
        }

        // if (this.selectedFiles) {
        //     //Nhiều ảnh
        //     for (let i = 0; i < this.selectedFiles.length; i++) {
        //         const file = this.selectedFiles[i]
        //         const img = {
        //             image: file.name,
        //             trangThai: false
        //         }
        //         this.tintuc.anhTinTucs.push(img)
        //     }
        // }

        this.tintuc.userId = this.auth.getIdFromToken()
        if (this.fileSelect) {
            this.onUpload()
            this.fileSelect = false
        }

        if (this.tintuc.tieuDe && this.tintuc.noiDung) {
            if (this.tintuc.id) {
                this.tinTucService.update(this.tintuc).subscribe({
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
                this.tinTucService.create(this.tintuc).subscribe({
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
    delete(tintuc: ITinTuc) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + tintuc.tieuDe + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tinTucService.delete(tintuc.id).subscribe((res) => {
                    this.loadData()

                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                })
            }
        })
    }

    loaiXlsx: any
    exportToExcel(): void {
        const headers = ['Mã tin tức', 'Loại tin tức', 'Người viết', 'Tiêu đề', 'Nội dung', 'Trạng thái', 'Ngày tạo', 'Ngày sửa']

        const data = this.loaiXlsx.map((item: any) => [
            item.id,
            item.tenDanhMuc,
            item.tenNguoiViet,
            item.tieuDe,
            this.truncateString(item.noiDung, 32767),
            item.trangThai,
            this.formatDate(item.createdAt),
            this.formatDate(item.updatedAt)
        ])

        this.excelService.exportAsExcelFile(data, headers, 'Tin tức')
    }

    private formatDate(dateString: string): string {
        if (!dateString) {
            return ''
        }
        return moment(dateString).format('DD/MM/YYYY HH:mm')
    }

    private truncateString(str: string, maxLength: number): string {
        if (!str) return ''
        return str.length > maxLength ? str.substring(0, maxLength) : str
    }
    /*
     *Upload ảnh sản phẩm
     */

    fileOnly: any
    // selectedFiles!: any[]
    sequenceNumber = 0
    fileSelect: boolean = false

    // onFilesArray(event: any) {
    //     const files: FileList = event.target.files
    //     this.selectedFiles = Array.from(files).map((file) => {
    //         const newName = this.generateNewFileName(file.name)
    //         return new File([file], newName, { type: file.type })
    //     })
    // }

    // generateNewFileName(oldFileName: string): string {
    //     const timestamp = new Date().getTime()
    //     const extension = oldFileName.split('.').pop()
    //     const newFileName = `news${timestamp}_${this.sequenceNumber}.${extension}`
    //     this.sequenceNumber++
    //     return newFileName
    // }

    onFileOnly(event: any) {
        const files: FileList = event.target.files
        if (files.length > 0) {
            this.fileSelect = true
            const file = files[0]
            const newName = this.generateNewFileName(file.name)
            this.fileOnly = new File([file], newName, { type: file.type })
        } else {
            this.fileSelect = false
        }
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime()
        const extension = oldFileName.split('.').pop()
        const newFileName = `news_${timestamp}.${extension}`
        return newFileName
    }
    onUpload() {
        this.tinTucService.uploadFiles(this.fileOnly).subscribe({})
        // if (this.selectedFiles && this.selectedFiles.length > 0) {
        //     this.tinTucService.uploadFiles(this.selectedFiles).subscribe({})
        // }
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
        if (!this.tintucList || !this.tintucList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.tintucList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.tintucList?.totalItems) {
            return this.tintucList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
