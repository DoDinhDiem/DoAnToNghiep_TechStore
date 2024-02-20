import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { Galleria } from 'primeng/galleria'
import { baseUrl } from 'src/app/Api/baseHttp'
import { TrangChuService } from 'src/app/Service/trang-chu.service'
declare var $: any
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    baseUrl = baseUrl

    constructor(private TrangChuService: TrangChuService) {}
    ngOnInit() {
        this.initOwlCarousel()
        this.GetSlide()
    }

    GetSlide() {
        this.TrangChuService.GetSlide().subscribe((data) => {
            this.images = data
        })
    }

    //Next or prev của sản phẩm

    private initOwlCarousel() {
        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                nav: false,
                dots: true,
                margin: 20,
                loop: false,
                responsive: {
                    '0': {
                        items: 1
                    },
                    '480': {
                        items: 2
                    },
                    '768': {
                        items: 3
                    },
                    '992': {
                        items: 4
                    },
                    '1200': {
                        items: 3,
                        nav: true
                    },
                    '1600': {
                        items: 5,
                        nav: true
                    }
                }
            })
        })
    }

    //Slide
    images: any[] | undefined

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]
}
