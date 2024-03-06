import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeedBackComponent } from './feed-back.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: FeedBackComponent }])],
    exports: [RouterModule]
})
export class FeedBackModule {}
