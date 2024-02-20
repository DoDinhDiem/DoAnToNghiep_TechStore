import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TinTucComponent } from './tin-tuc.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: TinTucComponent }])],
    exports: [RouterModule]
})
export class TinTucModule {}
