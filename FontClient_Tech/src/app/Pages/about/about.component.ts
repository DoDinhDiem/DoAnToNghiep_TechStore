import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    ngOnInit() {
        this.items = [{ label: 'Giới thiệu' }]

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
}
