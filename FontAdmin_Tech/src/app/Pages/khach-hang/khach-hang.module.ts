import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KhachHangComponent } from './khach-hang.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: KhachHangComponent }])],
    exports: [RouterModule]
})
export class KhachHangModule {}
