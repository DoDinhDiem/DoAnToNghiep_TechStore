import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogComponent } from './blog.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: BlogComponent }])],
    exports: [RouterModule]
})
export class BlogModule {}
