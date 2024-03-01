import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SuccessComponent } from '../success/success.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SuccessComponent }])],
    exports: [RouterModule]
})
export class SuccessModule {}
