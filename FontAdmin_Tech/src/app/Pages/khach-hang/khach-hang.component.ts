import { Component } from '@angular/core'

@Component({
    selector: 'app-khach-hang',
    templateUrl: './khach-hang.component.html',
    styleUrls: ['./khach-hang.component.scss']
})
export class KhachHangComponent {
    title = 'Khách hàng'
    visible: boolean = false
    checked: boolean = true
    Save = 'Lưu'

    showDialog() {
        this.visible = true
        this.Save = 'Lưu'
    }
    closeDialog() {
        this.visible = false
    }

    editModal() {
        this.visible = true
        this.Save = 'Cập nhập'
    }

    onSubmit() {}
}
