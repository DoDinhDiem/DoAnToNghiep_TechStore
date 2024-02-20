import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShoppingCartComponent } from './shopping-cart.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ShoppingCartComponent }])],
    exports: [RouterModule]
})
export class ShoppingCartModule {}
