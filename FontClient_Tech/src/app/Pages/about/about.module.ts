import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutComponent } from './about.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AboutComponent }])],
    exports: [RouterModule]
})
export class AboutModule {}
