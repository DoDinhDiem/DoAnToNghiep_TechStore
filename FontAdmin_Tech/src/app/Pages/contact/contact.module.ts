import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContactComponent } from '../contact/contact.component'
import { RouterModule } from '@angular/router'
import { SafePipe } from './safe.pipe'
@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ContactComponent }])],
    exports: [RouterModule]
})
export class ContactModule {}
