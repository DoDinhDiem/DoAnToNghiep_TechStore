import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { INhanVien } from 'src/app/Models/nhan-vien'
import { NhanVienService } from 'src/app/Service/nhan-vien.service'
import { ChucVuService } from 'src/app/Service/chuc-vu.service'
import { RoleService } from 'src/app/Service/role.service'
import { DatePipe } from '@angular/common'

@Component({
    selector: 'app-nhan-vien',
    templateUrl: './nhan-vien.component.html',
    styleUrls: ['./nhan-vien.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class NhanVienComponent {
    baseUrl = baseUrl

    //title
    title = 'Nhân viên'

    //Khai báo true/false cho dialog
    visible: boolean = false
    visible_edit: boolean = false
    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi nhân viên
    nhanvien!: INhanVien
    nhanvienList: any

    //Gọi constructor
    constructor(
        private nhanVienService: NhanVienService,
        private chucVuService: ChucVuService,
        private roleService: RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.nhanvien = {}
        this.visible = true
        this.Save = 'Lưu'
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.nhanvien = {}
    }

    closeEditDialog() {
        this.visible_edit = false
        this.nhanvien = {}
    }

    //Gọi load nhân viên
    role: any[] = []
    chucvu: any[] = []

    loadData() {
        this.showSkeleton = true
        this.chucVuService.getAll().subscribe((data) => {
            this.chucvu = data.map((item) => ({
                id: item.id,
                name: item.tenChucVu
            }))
        })
        this.roleService.getAll().subscribe((data) => {
            this.role = data.map((item) => ({
                id: item.id,
                name: item.tenRole
            }))
        })
        setTimeout(() => {
            this.nhanVienService.search(this.key, this.email, this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.nhanvienList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Cập nhập trạng thái
    trangThai(nhanvien: INhanVien) {
        this.nhanVienService.updateTrangThai(nhanvien.id).subscribe((res) => {
            this.loadData()
        })
    }

    //Gọi mở sửa dialog
    editModal(nhanvien: INhanVien) {
        this.nhanVienService.getById(nhanvien.id).subscribe((data) => {
            data.ngaySinh = new DatePipe('en-US').transform(data.ngaySinh, 'yyyy-MM-dd')
            data.ngayVaoLam = new DatePipe('en-US').transform(data.ngayVaoLam, 'yyyy-MM-dd')
            this.nhanvien = data
            this.fileOnly = { name: data.avatar }
            this.visible_edit = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        if (this.nhanvien.trangThai == undefined) {
            this.nhanvien.trangThai = false
        }
        if (this.fileOnly) {
            this.nhanvien.avatar = this.fileOnly.name
        }
        this.nhanvien.passWord = 'techstore@123'

        if (this.fileSelected) {
            this.onUpload()
        }

        if (this.nhanvien.hoTen && this.nhanvien.id) {
            this.nhanVienService.update(this.nhanvien).subscribe({
                next: (res) => {
                    this.loadData()
                    this.closeEditDialog()
                    this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                },
                error: (err) => {
                    this.loadData()
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi! Vui lòng xem lại', life: 3000 })
                }
            })
        } else {
            this.nhanVienService.create(this.nhanvien).subscribe({
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

    //Xóa 1 nhân viên
    delete(nhanvien: INhanVien) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa ' + nhanvien.hoTen + '?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nhanVienService.delete(nhanvien.id).subscribe((res) => {
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
    email: any = ''
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
        if (!this.nhanvienList || !this.nhanvienList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.nhanvienList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.nhanvienList?.totalItems) {
            return this.nhanvienList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false

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
        const newFileName = `products_${timestamp}.${extension}`
        return newFileName
    }

    onUpload() {
        this.nhanVienService.uploadFiles(this.fileOnly).subscribe()
    }
}
