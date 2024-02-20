import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ProfileHomeComponent } from './profile-home.component'

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ProfileHomeComponent }])],
    exports: [RouterModule]
})
export class ProfileHomeModule {}
