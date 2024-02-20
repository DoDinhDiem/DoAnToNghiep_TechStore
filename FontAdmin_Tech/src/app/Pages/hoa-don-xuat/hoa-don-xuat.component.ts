import { Component } from '@angular/core'

@Component({
    selector: 'app-hoa-don-xuat',
    templateUrl: './hoa-don-xuat.component.html',
    styleUrls: ['./hoa-don-xuat.component.scss']
})
export class HoaDonXuatComponent {
    title = 'Hóa đơn xuất'
    visible_edit: boolean = false
    checked: boolean = true

    closeDialog() {
        this.visible_edit = false
    }

    editModal() {
        this.visible_edit = true
    }

    onSubmit() {}
}
