import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    ngOnInit() {
        this.items = [{ label: 'Tim tức' }, { label: 'Danh mục tin tức' }]

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
}
