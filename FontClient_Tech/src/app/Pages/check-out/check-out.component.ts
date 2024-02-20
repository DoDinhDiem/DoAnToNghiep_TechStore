import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    ngOnInit() {
        this.items = [{ label: 'Thanh toán' }]

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
}
