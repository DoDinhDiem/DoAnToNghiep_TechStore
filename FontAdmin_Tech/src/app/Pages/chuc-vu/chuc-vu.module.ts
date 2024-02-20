import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChucVuComponent } from './chuc-vu.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ChucVuComponent }])],
    exports: [RouterModule]
})
export class ChucVuModule {}
