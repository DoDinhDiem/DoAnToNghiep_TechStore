import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AnhTinTucComponent } from './anh-tin-tuc.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AnhTinTucComponent }])],
    exports: [RouterModule]
})
export class AnhTinTucModule {}
