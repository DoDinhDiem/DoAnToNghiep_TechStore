import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckOutComponent } from './check-out.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: CheckOutComponent }])],
    exports: [RouterModule]
})
export class CheckOutModule {}
