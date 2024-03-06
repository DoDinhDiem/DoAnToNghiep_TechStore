import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ConfimMailComponent } from './confim-mail.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ConfimMailComponent }])],
    exports: [RouterModule]
})
export class ConfimMailModule {}
