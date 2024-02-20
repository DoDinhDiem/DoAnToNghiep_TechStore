import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { RoleComponent } from './role.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: RoleComponent }])],
    exports: [RouterModule]
})
export class RoleModule {}
