import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Subscription, interval } from 'rxjs'
import { AccountService } from 'src/app/Service/account.service'
import { UserStoreService } from 'src/app/Service/user-store.service'

@Component({
    selector: 'app-confim-mail',
    templateUrl: './confim-mail.component.html',
    styleUrls: ['./confim-mail.component.scss'],
    providers: [MessageService]
})
export class ConfimMailComponent implements OnInit, OnDestroy {
    email: any
    otp: any

    private subscription!: Subscription
    public secondsToDday: number = 0

    constructor(private accountService: AccountService, private userstoreService: UserStoreService, private messageService: MessageService, private router: Router) {}

    ngOnInit(): void {
        this.userstoreService.getEmailFromStore().subscribe((val) => {
            localStorage.setItem('userEmail', val)
        })
        this.resetTimer()
    }

    resetOtp() {
        this.email = localStorage.getItem('userEmail')
        this.accountService.SendEmailOTP(this.email).subscribe((res) => {
            this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
            this.resetTimer()
        })
    }

    resetTimer() {
        this.secondsToDday = 60
        this.subscription = interval(1000).subscribe(() => {
            if (this.secondsToDday > 0) {
                this.secondsToDday--
                localStorage.setItem('countdownSeconds', this.secondsToDday.toString())
            } else {
                this.subscription.unsubscribe()
            }
        })
    }

    onSubmit() {
        this.email = localStorage.getItem('userEmail')
        this.accountService.TrangThai(this.email, this.otp).subscribe({
            next: (res) => {
                console.log(res)
                this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: res.message, life: 3000 })
                localStorage.removeItem('userEmail')
                this.router.navigate(['/account'])
            },
            error: (err) => {
                console.log(err)
                this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: err?.error.message, life: 3000 })
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
