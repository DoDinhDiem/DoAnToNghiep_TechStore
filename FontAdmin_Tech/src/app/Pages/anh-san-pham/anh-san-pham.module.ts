import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AnhSanPhamComponent } from './anh-san-pham.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AnhSanPhamComponent }])],
    exports: [RouterModule]
})
export class AnhSanPhamModule {}
