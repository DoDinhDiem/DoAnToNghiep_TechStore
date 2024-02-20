import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NhanVienComponent } from './nhan-vien.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: NhanVienComponent }])],
    exports: [RouterModule]
})
export class NhanVienModule {}
