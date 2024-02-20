import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NhaCungCapComponent } from './nha-cung-cap.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: NhaCungCapComponent }])],
    exports: [RouterModule]
})
export class NhaCungCapModule {}
