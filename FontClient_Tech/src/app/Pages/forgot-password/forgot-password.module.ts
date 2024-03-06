import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ForgotPasswordComponent } from './forgot-password.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ForgotPasswordComponent }])],
    exports: [RouterModule]
})
export class ForgotPasswordModule {}
