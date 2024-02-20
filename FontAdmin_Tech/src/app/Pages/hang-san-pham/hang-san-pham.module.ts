import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HangSanPhamComponent } from './hang-san-pham.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: HangSanPhamComponent }])],
    exports: [RouterModule]
})
export class HangSanPhamModule {}
