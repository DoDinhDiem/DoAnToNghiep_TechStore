import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ThongSoSanPhamComponent } from './thong-so-san-pham.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ThongSoSanPhamComponent }])],
    exports: [RouterModule]
})
export class ThongSoSanPhamModule {}
