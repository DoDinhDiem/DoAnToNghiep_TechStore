import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { ITinTuc } from 'src/app/Models/tin-tuc'
import { DanhMucTinTucService } from 'src/app/Service/danh-muc-tin-tuc.service'
import { TinTucService } from 'src/app/Service/tin-tuc.service'

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

    //Gọi constructor
    constructor(
        private tinTucService: TinTucService,
        private danhMucSanPhamService: DanhMucTinTucService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
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
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.tintuc = {}
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
            this.tinTucService.search(this.key, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.tintucList = data
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
            this.fileOnlyEdit = data.image
            this.selectedFilesEdit = data.anhTinTuc
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    tintucDetail: any
    image: any
    nguoiViet: any
    showSeeDialog(tintuc: ITinTuc) {
        this.tinTucService.getById(tintuc.id).subscribe((data) => {
            this.tintucDetail = data.tinTuc
            this.image = data.image
            this.nguoiViet = data.tenNguoiViet
            this.visible_look = true
        })
    }

    onSubmit() {
        if (this.tintuc.trangThai == undefined) {
            this.tintuc.trangThai = false
        }

        //Ảnh sản phẩm
        this.tintuc.anhTinTucs = []
        //Một ảnh
        if (this.fileOnly) {
            for (let i = 0; i < this.fileOnly.length; i++) {
                const file = this.fileOnly[i]
                const img = {
                    image: file.name,
                    trangThai: true
                }
                this.tintuc.anhTinTucs.push(img)
            }
        }

        if (this.selectedFiles) {
            //Nhiều ảnh
            for (let i = 0; i < this.selectedFiles.length; i++) {
                const file = this.selectedFiles[i]
                const img = {
                    image: file.name,
                    trangThai: false
                }
                this.tintuc.anhTinTucs.push(img)
            }
        }
        //Sửa ảnh
        if (this.fileOnlyEdit && this.fileOnly == undefined) {
            const file = this.fileOnlyEdit
            const img = {
                image: file.image,
                trangThai: true
            }
            this.tintuc.anhTinTucs.push(img)
        }

        if (this.selectedFilesEdit && this.selectedFiles == undefined) {
            for (let i = 0; i < this.selectedFilesEdit.length; i++) {
                const file = this.selectedFilesEdit[i]
                const img = {
                    image: file.image,
                    trangThai: false
                }
                this.tintuc.anhTinTucs.push(img)
            }
        }

        this.tintuc.userId = 3
        if (this.fileOnly || this.selectedFiles) {
            this.onUpload()
        }

        if (this.tintuc.tieuDe && this.tintuc.id) {
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

    /*
     *Upload ảnh sản phẩm
     */

    fileOnly: any
    selectedFiles!: any[]
    sequenceNumber = 0

    onFilesArray(event: any) {
        const files: FileList = event.target.files
        this.selectedFiles = Array.from(files).map((file) => {
            const newName = this.generateNewFileName(file.name)
            return new File([file], newName, { type: file.type })
        })
    }

    onFileOnly(event: any) {
        const files: FileList = event.target.files
        this.fileOnly = Array.from(files).map((file) => {
            const newName = this.generateNewFileName(file.name)
            return new File([file], newName, { type: file.type })
        })
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime()
        const extension = oldFileName.split('.').pop()
        const newFileName = `news${timestamp}_${this.sequenceNumber}.${extension}`
        this.sequenceNumber++
        return newFileName
    }
    onUpload() {
        if (this.fileOnly && this.fileOnly.length > 0) {
            this.tinTucService.uploadFiles(this.fileOnly).subscribe({})
        }
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.tinTucService.uploadFiles(this.selectedFiles).subscribe({})
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