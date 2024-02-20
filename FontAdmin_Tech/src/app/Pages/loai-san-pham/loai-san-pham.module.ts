import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LoaiSanPhamComponent } from './loai-san-pham.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: LoaiSanPhamComponent }])],
    exports: [RouterModule]
})
export class LoaiSanPhamModule {}
