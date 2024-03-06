import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ChangePassComponent } from './change-pass.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ChangePassComponent }])],
    exports: [RouterModule]
})
export class ChangePassModule {}
