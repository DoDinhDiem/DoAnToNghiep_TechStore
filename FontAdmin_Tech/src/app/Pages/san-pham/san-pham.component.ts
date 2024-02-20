import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { UploadEvent } from 'primeng/fileupload'
import { ISanPham } from 'src/app/Models/san-pham'
import { SanPhamService } from 'src/app/Service/san-pham.service'
import { baseUrl } from 'src/app/Api/baseHttp'
import { LoaiSanPhamService } from 'src/app/Service/loai-san-pham.service'
import { HangSanPhamService } from 'src/app/Service/hang-san-pham.service'

@Component({
    selector: 'app-san-pham',
    templateUrl: './san-pham.component.html',
    styleUrls: ['./san-pham.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SanPhamComponent {
    baseUrl = baseUrl

    //Title
    title = 'Sản phẩm'

    //Khai bóa true/false cho dialog
    visible: boolean = false
    edit: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi sản phẩm
    sanpham!: ISanPham
    sanphamList: any

    //select và hiển ở table của loại
    loai: any[] = []

    //select và hiển ở table của hãng
    hang: any[] = []

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private sanphamService: SanPhamService,
        private loaiService: LoaiSanPhamService,
        private hangService: HangSanPhamService
    ) {}

    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.sanpham = {}
        this.selectedFiles = []
        this.fileOnly = {}
        this.productParameters = []
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.sanpham = {}
    }

    //Gọi load sản phẩm
    loadData() {
        this.showSkeleton = true
        this.loaiService.getAll().subscribe((data) => {
            this.loai = data.map((item) => ({
                id: item.id,
                name: item.tenLoai
            }))
        })
        this.hangService.getAll().subscribe((data) => {
            this.hang = data.map((item) => ({
                id: item.id,
                name: item.tenHang
            }))
        })
        setTimeout(() => {
            this.sanphamService.search(this.key, this.giaBanMin, this.giaBanMax, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.sanphamList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(sanpham: any) {
        this.sanphamService.updateTrangThai(sanpham.sanPham.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(sanpham: ISanPham) {
        this.sanphamService.getById(sanpham.id).subscribe((data) => {
            this.edit = true
            this.sanpham = data.sanPham
            this.selectedFiles = data.anhSanPhams
            this.fileOnly = data.image
            this.productParameters = data.thongSos
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        if (this.sanpham.trangThai == undefined) {
            this.sanpham.trangThai = false
        }

        //Ảnh sản phẩm
        this.sanpham.anhSanPhams = []

        if (this.fileOnly) {
            //Một ảnh
            for (let i = 0; i < this.fileOnly.length; i++) {
                const file = this.fileOnly[i]
                const img = {
                    image: file.name,
                    trangThai: true
                }
                this.sanpham.anhSanPhams.push(img)
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
                this.sanpham.anhSanPhams.push(img)
            }
        }

        //Thông số sản phẩm
        this.sanpham.thongSos = []
        for (let i = 0; i < this.productParameters.length; i++) {
            const parameter = this.productParameters[i]
            const thongSo = {
                tenThongSo: parameter.tenThongSo,
                moTa: parameter.moTa,
                trangThai: true
            }
            this.sanpham.thongSos.push(thongSo)
        }

        if (this.fileOnly || this.selectedFiles) {
            this.onUpload()
        }

        if (this.sanpham.tenSanPham && this.sanpham.id) {
            this.sanphamService.update(this.sanpham).subscribe({
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
            this.sanphamService.create(this.sanpham).subscribe({
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

    //Xóa 1 sản phẩm
    delete(sanpham: any) {
        const tenSanPham = sanpham.sanPham.tenSanPham
        const id = sanpham.sanPham.id
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + tenSanPham + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sanphamService.delete(id).subscribe((res) => {
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
        const newFileName = `products_${timestamp}_${this.sequenceNumber}.${extension}`
        this.sequenceNumber++
        return newFileName
    }
    onUpload() {
        if (this.fileOnly && this.fileOnly.length > 0) {
            this.sanphamService.uploadFiles(this.fileOnly).subscribe({})
        }
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.sanphamService.uploadFiles(this.selectedFiles).subscribe({})
        }
    }

    /*
     *Thông số sản phẩm
     */
    productParameters: any[] = []
    addRowParameter() {
        this.productParameters.push({
            tenThongSo: '',
            moTa: ''
        })
    }

    //Xóa 1 thông số
    removeRowParameter(index: number) {
        this.productParameters.splice(index, 1)
    }

    //End chi tiết sản phẩm

    /*
     *Đoạn code thay đổi dữ liệu khi tìm kiếm next/prev trang
     *Và show hiển thị từ đến
     *Và sử dụng skeleton
     */

    //Khai báo key, page, pageSize
    key: any = ''
    giaBanMin: any = ''
    giaBanMax: any = ''
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
        if (!this.sanphamList || !this.sanphamList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.sanphamList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.sanphamList?.totalItems) {
            return this.sanphamList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false

    //Xem chi tiết sản phẩm
    images: any[] | undefined
    thongSo: any[] | undefined

    spDetail: ISanPham = {}

    showDetail(id: any) {
        this.sanphamService.getById(id).subscribe((data) => {
            this.images = data.listImage
            this.spDetail = data.sanPham
            this.thongSo = data.thongSos
        })
    }

    get activeIndex(): number {
        return this._activeIndex
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
            this._activeIndex = newValue
        }
    }

    _activeIndex: number = 2

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]

    next() {
        this.activeIndex++
    }

    prev() {
        this.activeIndex--
    }
}
