import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SanPhamComponent } from './san-pham.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SanPhamComponent }])],
    exports: [RouterModule]
})
export class SanPhamModule {}
