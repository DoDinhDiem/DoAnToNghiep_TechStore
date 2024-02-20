import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DanhMucTinTucComponent } from './danh-muc-tin-tuc.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DanhMucTinTucComponent }])],
    exports: [RouterModule]
})
export class DanhMucTinTucModule {}
