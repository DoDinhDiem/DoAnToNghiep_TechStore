import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchComponent } from '../search/search.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: SearchComponent }])],
    exports: [RouterModule]
})
export class SearchModule {}
