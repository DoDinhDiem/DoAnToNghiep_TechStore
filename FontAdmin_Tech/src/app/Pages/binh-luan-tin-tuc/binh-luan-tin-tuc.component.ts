import { Component } from '@angular/core'

@Component({
    selector: 'app-binh-luan-tin-tuc',
    templateUrl: './binh-luan-tin-tuc.component.html',
    styleUrls: ['./binh-luan-tin-tuc.component.scss']
})
export class BinhLuanTinTucComponent {
    title = 'Bình luận tin tức'
    visible: boolean = false
    checked: boolean = true
    Save = 'Lưu'

    isCommentBoxVisible: boolean = false

    toggleCommentBox() {
        this.isCommentBoxVisible = !this.isCommentBoxVisible
    }

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
