import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { IAnhSanPham } from 'src/app/Models/anh-san-pham'
import { AnhSanPhamService } from 'src/app/Service/anh-san-pham.service'

@Component({
    selector: 'app-anh-san-pham',
    templateUrl: './anh-san-pham.component.html',
    styleUrls: ['./anh-san-pham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class AnhSanPhamComponent {
    baseUrl = baseUrl
    //title
    title = 'Ảnh sản phẩm'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi loại sản phẩm
    anhSP!: IAnhSanPham
    anhSPList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(
        private anhSanPhamService: AnhSanPhamService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = +params['id']
        })
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.anhSP = {}
        this.fileOnly = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.anhSP = {}
        this.submitted = false
    }

    //Gọi load loại sản phẩm
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.anhSanPhamService.search(this.id, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.anhSPList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(anhSP: IAnhSanPham) {
        this.anhSanPhamService.updateTrangThai(anhSP.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(anhSP: IAnhSanPham) {
        this.anhSanPhamService.getById(anhSP.id).subscribe((data) => {
            this.anhSP = data
            this.fileOnly = { name: data.image }
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        this.anhSP.sanPhamId = this.id
        if (this.anhSP.trangThai == undefined) {
            this.anhSP.trangThai = false
        }

        if (this.fileOnly) {
            this.anhSP.image = this.fileOnly.name
        }

        this.onUpload()
        if (this.anhSP.image) {
            if (this.anhSP.id) {
                this.anhSanPhamService.update(this.anhSP).subscribe({
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
                this.anhSanPhamService.create(this.anhSP).subscribe({
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
    delete(anhSP: IAnhSanPham) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ảnh này không ?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.anhSanPhamService.delete(anhSP.id).subscribe((res) => {
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
    id!: number
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
        if (!this.anhSPList || !this.anhSPList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.anhSPList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.anhSPList?.totalItems) {
            return this.anhSPList?.totalItems
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
    onFileOnly(event: any) {
        const files: FileList = event.target.files
        const file = files[0]
        const newName = this.generateNewFileName(file.name)
        this.fileOnly = new File([file], newName, { type: file.type })
    }

    generateNewFileName(oldFileName: string): string {
        const timestamp = new Date().getTime()
        const extension = oldFileName.split('.').pop()
        const newFileName = `products_${timestamp}.${extension}`
        return newFileName
    }

    onUpload() {
        this.anhSanPhamService.uploadFiles(this.fileOnly).subscribe()
    }
}
