import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContactComponent } from './contact.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ContactComponent }])],
    exports: [RouterModule]
})
export class ContactModule {}
