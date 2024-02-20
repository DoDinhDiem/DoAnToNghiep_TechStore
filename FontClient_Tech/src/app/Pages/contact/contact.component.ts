import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    ngOnInit() {
        this.items = [{ label: 'Liên hệ' }]

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
}
