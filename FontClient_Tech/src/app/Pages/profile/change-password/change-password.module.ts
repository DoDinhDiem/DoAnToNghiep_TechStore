import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ChangePasswordComponent } from './change-password.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ChangePasswordComponent }])],
    exports: [RouterModule]
})
export class ChangePasswordModule {}
