import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileRankComponent } from './profile-rank.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ProfileRankComponent }])],
    exports: [RouterModule]
})
export class ProfileRankModule {}
