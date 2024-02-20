import { NgModule } from '@angular/core'
import { ProfileComponent } from '../profile/profile.component'
import { RouterModule } from '@angular/router'

import { ProfileHomeComponent } from './profile-home/profile-home.component'
import { ProfileHistoryComponent } from './profile-history/profile-history.component'
import { ProfileRankComponent } from './profile-rank/profile-rank.component'
import { ProfileAccountComponent } from './profile-account/profile-account.component'

import { ProfileHomeModule } from './profile-home/profile-home.module'
import { ProfileHistoryModule } from './profile-history/profile-history.module'
import { ProfileRankModule } from './profile-rank/profile-rank.module'
import { ProfileAccountModule } from './profile-account/profile-account.module'
import { ToppingFundasComponent } from './topping-fundas/topping-fundas.component'
import { ToppingFundasModule } from './topping-fundas/topping-fundas.module'
@NgModule({
    declarations: [ProfileHomeComponent, ProfileHistoryComponent, ProfileRankComponent, ProfileAccountComponent, ToppingFundasComponent],
    imports: [ProfileHomeModule, ProfileHistoryModule, ProfileRankModule, ProfileAccountModule, ToppingFundasModule, RouterModule.forChild([{ path: '', component: ProfileComponent }])],
    exports: [RouterModule]
})
export class ProfileModule {}
