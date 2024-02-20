import { NgModule } from '@angular/core'
import { ProfileHistoryComponent } from './profile-history.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ProfileHistoryComponent }])],
    exports: [RouterModule]
})
export class ProfileHistoryModule {}
