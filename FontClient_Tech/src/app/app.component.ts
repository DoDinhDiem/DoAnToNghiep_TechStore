import { Component, AfterViewInit } from '@angular/core'
import { ScriptLoaderService } from './Service/script-loader.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TechStore'
}
