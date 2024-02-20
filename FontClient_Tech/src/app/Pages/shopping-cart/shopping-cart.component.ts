import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    ngOnInit() {
        this.items = [{ label: 'Cửa hàng' }, { label: 'Giỏ hàng' }]

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
}
