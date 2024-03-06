import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountComponent } from '../account/account.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AccountComponent }])],
    exports: [RouterModule]
})
export class AccountModule {}
