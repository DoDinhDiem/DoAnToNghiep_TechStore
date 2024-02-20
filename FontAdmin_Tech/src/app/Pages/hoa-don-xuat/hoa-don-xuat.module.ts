import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HoaDonXuatComponent } from './hoa-don-xuat.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: HoaDonXuatComponent }])],
    exports: [RouterModule]
})
export class HoaDonXuatModule {}
