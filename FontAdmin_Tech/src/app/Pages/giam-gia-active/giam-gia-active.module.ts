import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GiamGiaActiveComponent } from './giam-gia-active.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: GiamGiaActiveComponent }])],
    exports: [RouterModule]
})
export class GiamGiaActiveModule {}
