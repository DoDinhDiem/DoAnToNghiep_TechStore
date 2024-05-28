import { Component } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { IContact } from 'src/app/Models/contact'
import { ContactService } from 'src/app/Service/contact.service'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ContactComponent {
    //title
    title = 'Contact'

    //Khai báo true/false cho dialog
    visible: boolean = false

    //Khai báo lưu or cập nhập
    Save = 'Lưu'

    //Khai báo biến gọi Contact
    contact!: IContact
    contactList: any

    submitted: boolean = false

    //Gọi constructor
    constructor(private contactService: ContactService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    //Gọi chạy cùng component
    ngOnInit() {
        this.loadData()
    }

    //Gọi mở dialog
    showDialog() {
        this.contact = {}
        this.visible = true
        this.Save = 'Lưu'
        this.submitted = false
    }

    //Đóng dialog
    closeDialog() {
        this.visible = false
        this.contact = {}
        this.submitted = false
    }

    //Gọi load Contact
    loadData() {
        this.showSkeleton = true
        setTimeout(() => {
            this.contactService.search(this.currentPage, this.selectedPageSize).subscribe((data) => {
                this.contactList = data
                this.showSkeleton = false
            })
        }, 2000)
    }

    //Gọi mở sửa dialog
    editModal(contact: IContact) {
        this.contactService.getById(contact.id).subscribe((data) => {
            this.contact = data
            this.visible = true
            this.Save = 'Cập nhập'
        })
    }

    onSubmit() {
        this.submitted = true

        if (
            this.contact.map &&
            this.contact.duong &&
            this.contact.thonXom &&
            this.contact.xaPhuong &&
            this.contact.xaPhuong &&
            this.contact.quanHuyen &&
            this.contact.tinhThanhPho &&
            this.contact.email &&
            this.contact.soDienThoai
        ) {
            if (this.contact.id) {
                this.contactService.update(this.contact).subscribe({
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
                this.contactService.create(this.contact).subscribe({
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

    //Xóa 1 Contact
    delete(contact: IContact) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa không ?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contactService.delete(contact.id).subscribe((res) => {
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
        if (!this.contactList || !this.contactList.totalItems || this.selectedPageSize <= 0) {
            return 0
        }
        return Math.ceil(this.contactList.totalItems / this.selectedPageSize)
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
        if (this.selectedPageSize >= this.contactList?.totalItems) {
            return this.contactList?.totalItems
        } else {
            const endIndex = this.currentPage * this.selectedPageSize
            return endIndex > this.selectedPageSize ? this.selectedPageSize : endIndex
        }
    }

    //Khai báo sekeleton
    showSkeleton: boolean = false
}
