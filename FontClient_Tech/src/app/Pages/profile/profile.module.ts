import { NgModule } from '@angular/core'
import { ProfileComponent } from '../profile/profile.component'
import { RouterModule } from '@angular/router'

import { ProfileHomeModule } from './profile-home/profile-home.module'
import { ProfileHistoryModule } from './profile-history/profile-history.module'
import { ProfileRankModule } from './profile-rank/profile-rank.module'
import { ProfileAccountModule } from './profile-account/profile-account.module'
import { ToppingFundasModule } from './topping-fundas/topping-fundas.module'
import { ChangePasswordModule } from './change-password/change-password.module'
@NgModule({
    declarations: [],
    imports: [
        ProfileHomeModule,
        ChangePasswordModule,
        ProfileHistoryModule,
        ProfileRankModule,
        ProfileAccountModule,
        ToppingFundasModule,
        RouterModule.forChild([{ path: '', component: ProfileComponent }])
    ],
    exports: [RouterModule]
})
export class ProfileModule {}
