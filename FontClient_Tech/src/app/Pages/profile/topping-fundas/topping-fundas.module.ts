import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToppingFundasComponent } from './topping-fundas.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ToppingFundasComponent }])],
    exports: [RouterModule]
})
export class ToppingFundasModule {}
