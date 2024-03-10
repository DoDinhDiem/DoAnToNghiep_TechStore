import { Component } from '@angular/core'
import { AuthService } from 'src/app/Service/auth.service'

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    role: any
    constructor(private auth: AuthService) {
        this.role = this.auth.getRoleFromToken()
    }
    isProductCollapsed: boolean = false
    isNewsCollapsed: boolean = false
    isInvoiceCollapsed: boolean = false
    isManKindCollapsed: boolean = false
    isRoleCollapsed: boolean = false
    isSystemCollapsed: boolean = false

    toggleProductCollapse() {
        this.isProductCollapsed = !this.isProductCollapsed
        this.isNewsCollapsed = false
        this.isInvoiceCollapsed = false
        this.isManKindCollapsed = false
        this.isRoleCollapsed = false
        this.isSystemCollapsed = false
    }

    toggleNewsCollapse() {
        this.isNewsCollapsed = !this.isNewsCollapsed
        this.isProductCollapsed = false
        this.isInvoiceCollapsed = false
        this.isManKindCollapsed = false
        this.isSystemCollapsed = false
        this.isRoleCollapsed = false
    }

    toggleInvoiceCollapse() {
        this.isInvoiceCollapsed = !this.isInvoiceCollapsed
        this.isProductCollapsed = false
        this.isNewsCollapsed = false
        this.isManKindCollapsed = false
        this.isSystemCollapsed = false
        this.isRoleCollapsed = false
    }

    toggleManKindCollapse() {
        this.isManKindCollapsed = !this.isManKindCollapsed
        this.isProductCollapsed = false
        this.isNewsCollapsed = false
        this.isInvoiceCollapsed = false
        this.isSystemCollapsed = false
        this.isRoleCollapsed = false
    }

    toggleRoleCollapse() {
        this.isManKindCollapsed = false
        this.isProductCollapsed = false
        this.isNewsCollapsed = false
        this.isInvoiceCollapsed = false
        this.isSystemCollapsed = false
        this.isRoleCollapsed = false
    }

    toggleSystemCollapse() {
        this.isSystemCollapsed = !this.isSystemCollapsed
        this.isManKindCollapsed = false
        this.isProductCollapsed = false
        this.isNewsCollapsed = false
        this.isInvoiceCollapsed = false
        this.isRoleCollapsed = false
    }
}
