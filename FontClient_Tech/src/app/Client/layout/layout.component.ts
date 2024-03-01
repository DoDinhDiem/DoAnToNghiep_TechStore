import { Component, OnInit } from '@angular/core'
import { ScriptLoaderService } from 'src/app/Service/script-loader.service'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(private load: ScriptLoaderService) {}

    ngOnInit(): void {
        this.loadScripts()
    }
    private async loadScripts(): Promise<void> {
        await this.load.loadScript('assets/Client/js/main.js'),
            await this.load.loadScript('assets/Client/js/bootstrap.bundle.min.js'),
            // await this.load.loadScript('assets/Client/js/jquery.countdown.min.js'),
            await this.load.loadScript('assets/Client/js/jquery.plugin.min.js'),
            await this.load.loadScript('assets/Client/js/jquery.magnific-popup.min.js'),
            await this.load.loadScript('assets/Client/js/jquery.hoverIntent.min.js'),
            await this.load.loadScript('assets/Client/js/jquery.waypoints.min.js'),
            await this.load.loadScript('assets/Client/js/superfish.min.js'),
            await this.load.loadScript('assets/Client/js/bootstrap.bundle.min.js'),
            await this.load.loadScript('assets/Client/js/bootstrap-input-spinner.js'),
            await this.load.loadScript('assets/Client/js/demos/demo-14.js')
    }
}
