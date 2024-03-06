import { Component, ElementRef, ViewChild } from '@angular/core'
import { DanhMucTinTucService } from 'src/app/Service/danh-muc-tin-tuc.service'
import { DashboardService } from 'src/app/Service/dashboard.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    currentDate!: Date
    constructor(private dashboardService: DashboardService) {}
    ngOnInit() {
        this.currentDate = new Date()
        this.selectedYear = new Date().getFullYear()
        this.initializeYears()
        this.thongkeDay(this.selectedYear)
        this.thongkeWeed()
        this.getCountDonHang()
        this.getCountDoanhThu()
        this.getCountKhachHang()
        this.getCountSanPham()
        this.getCountTinTuc()
        this.getCountNhanVien()
        this.GetSanPhamBanChay()
    }

    formatCurrentDate(): string {
        const day = this.currentDate.getDate().toString().padStart(2, '0')
        const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0')
        const year = this.currentDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    years: number[] = []
    selectedYear!: number
    initializeYears() {
        const currentYear = new Date().getFullYear()
        const startYear = currentYear - 5
        // const endYear = currentYear + 5

        for (let year = startYear; year <= currentYear; year++) {
            this.years.push(year)
        }
    }

    countDonHang: number = 0
    getCountDonHang() {
        this.dashboardService.getCountDonHang().subscribe((res) => {
            this.countDonHang = res
        })
    }

    countDoanhThu: number = 0
    getCountDoanhThu() {
        this.dashboardService.getCountDoanhThu().subscribe((res) => {
            this.countDoanhThu = res
        })
    }

    countSanPham: number = 0
    getCountSanPham() {
        this.dashboardService.getCountSanPham().subscribe((res) => {
            this.countSanPham = res
        })
    }

    countKhachHang: number = 0
    getCountKhachHang() {
        this.dashboardService.getCountKhachHang().subscribe((res) => {
            this.countKhachHang = res
        })
    }

    countTinTuc: number = 0
    getCountTinTuc() {
        this.dashboardService.getCountTinTuc().subscribe((res) => {
            this.countTinTuc = res
        })
    }

    countNhanVien: number = 0
    getCountNhanVien() {
        this.dashboardService.getCountNhanVien().subscribe((res) => {
            this.countNhanVien = res
        })
    }

    sanPham: any
    GetSanPhamBanChay() {
        this.dashboardService.GetSanPhamBanChay().subscribe((res) => {
            this.sanPham = res
        })
    }

    data: any
    options: any
    totalMonthNow: any[] = []
    totalLastMoth: any[] = []
    tongNamNow: number = 0
    tongNamLast: number = 0

    thongkeDay(year: any) {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColor = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

        this.dashboardService.getThongKeTheoThang(year).subscribe((dataMonth) => {
            this.totalMonthNow = dataMonth.thongKeThang
            this.tongNamNow = dataMonth.tongTienNam
            this.dashboardService.getThongKeTheoThang(year - 1).subscribe((dataLastMonth) => {
                this.totalLastMoth = dataLastMonth.thongKeThang
                this.tongNamLast = dataLastMonth.tongTienNam

                this.data = {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    datasets: [
                        {
                            label: 'Năm hiện tại',
                            data: this.totalMonthNow.map((item) => item.tongTien),
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            tension: 0.4
                        },
                        {
                            label: 'Năm trước',
                            data: this.totalLastMoth.map((item) => item.tongTien),
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--pink-500'),
                            tension: 0.4
                        }
                    ]
                }
            })
        })

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        }
    }

    dataWeed: any
    optionsWeed: any
    totalWeekNow: any[] = []
    totalLastWeek: any[] = []
    tuanNow: number = 0
    tuanLast: number = 0
    thongkeWeed() {
        const documentStyle = getComputedStyle(document.documentElement)
        const textColor = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

        this.dashboardService.getThongKeTheoTuanHienTai().subscribe((dataWeekNow) => {
            this.totalWeekNow = dataWeekNow.thongKeTuan
            this.tuanNow = dataWeekNow.tongTienTuan

            this.dashboardService.getThongKeTheoNgayTrongTuanTruoc().subscribe((dataLastWeek) => {
                this.totalLastWeek = dataLastWeek.thongKeTuan
                this.tuanLast = dataLastWeek.tongTienTuan
                this.dataWeed = {
                    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                    datasets: [
                        {
                            label: 'Tuần hiện tại',
                            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            data: this.totalWeekNow.map((item) => item.tongTien)
                        },
                        {
                            label: 'Tuần trước',
                            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                            borderColor: documentStyle.getPropertyValue('--pink-500'),
                            data: this.totalLastWeek.map((item) => item.tongTien)
                        }
                    ]
                }
            })
        })

        this.optionsWeed = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        }
    }
}
