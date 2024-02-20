import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BinhLuanTinTucComponent } from './binh-luan-tin-tuc.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: BinhLuanTinTucComponent }])],
    exports: [RouterModule]
})
export class BinhLuanTinTucModule {}
