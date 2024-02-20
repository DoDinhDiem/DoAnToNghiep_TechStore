import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BlogDetailComponent } from './blog-detail.component'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: BlogDetailComponent }])],
    exports: [RouterModule]
})
export class BlogDetailModule {}
