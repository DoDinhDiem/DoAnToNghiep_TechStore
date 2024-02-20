import { NgModule } from '@angular/core'
import { ProductDetailComponent } from './product-detail.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ProductDetailComponent }])],
    exports: [RouterModule]
})
export class ProductDetailModule {}
