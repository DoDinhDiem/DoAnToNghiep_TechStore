import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SignUpComponent } from './sign-up.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SignUpComponent }])],
    exports: [RouterModule]
})
export class SignUpModule {}
