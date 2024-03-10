import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaGiamGiaComponent } from './ma-giam-gia.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: MaGiamGiaComponent }])],
    exports: [RouterModule]
})
export class MaGiamGiaModule {}
