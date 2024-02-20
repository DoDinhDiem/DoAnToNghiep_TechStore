import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ProfileAccountComponent } from './profile-account.component'

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ProfileAccountComponent }])],
    exports: [RouterModule]
})
export class ProfileAccountModule {}
