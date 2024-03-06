import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ResetPassComponent } from './reset-pass.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ResetPassComponent }])],
    exports: [RouterModule]
})
export class ResetPassModule {}
