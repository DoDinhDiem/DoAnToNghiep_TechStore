import { AfterViewInit, Component } from '@angular/core'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        const scripts = ['assets/Admin/js/app.min.js']

        scripts.forEach((script) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = script
            document.body.appendChild(scriptElement)
        })
    }
}
