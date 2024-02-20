import { Component, AfterViewInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { ProductDetailService } from 'src/app/Service/product-detail.service'

declare var $: any
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
    items: MenuItem[] | undefined

    home: MenuItem | undefined

    images: any[] | undefined

    get activeIndex(): number {
        return this._activeIndex
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
            this._activeIndex = newValue
        }
    }

    _activeIndex: number = 2

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

    constructor(private photoService: ProductDetailService) {}

    ngOnInit() {
        this.initOwlCarousel()
        this.photoService.getImages().then((images) => (this.images = images))
        this.items = [{ label: 'Loại sản phẩm' }, { label: 'Chi tiết sản phẩm' }]
        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }

    next() {
        this.activeIndex++
    }

    prev() {
        this.activeIndex--
    }

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
                        items: 4,
                        nav: true,
                        dots: false
                    }
                }
            })
        })
    }
}
