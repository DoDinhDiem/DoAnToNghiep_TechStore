import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { baseUrl } from 'src/app/Api/baseHttp'
import { HeThongService } from 'src/app/Service/he-thong.service'

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    baseUrl = baseUrl
    constructor(private heThongService: HeThongService) {}
    ngOnInit() {
        this.GetGioiThieu()
    }

    about: any
    nhanvien: any
    GetGioiThieu() {
        this.heThongService.GetGioiThieu().subscribe((data: any) => {
            this.about = data.about
            this.nhanvien = data.nhanvien
        })
    }
}
