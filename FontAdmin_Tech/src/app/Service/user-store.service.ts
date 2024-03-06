import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private fullName$ = new BehaviorSubject<string>('')
    private role$ = new BehaviorSubject<string>('')
    private email$ = new BehaviorSubject<string>('')
    private chucvu$ = new BehaviorSubject<string>('')
    private id$ = new BehaviorSubject<number>(0)

    constructor() {}

    public getRoleFromStore() {
        return this.role$.asObservable()
    }

    public setRoleForStore(role: string) {
        this.role$.next(role)
    }

    public getFullNameFromStore() {
        return this.fullName$.asObservable()
    }

    public setFullNameForStore(fullname: string) {
        this.fullName$.next(fullname)
    }

    public getEmailFromStore() {
        return this.email$.asObservable()
    }

    public setEmailForStore(email: string) {
        this.email$.next(email)
    }

    public getChucVuFromStore() {
        return this.chucvu$.asObservable()
    }

    public setChucVuForStore(chucvu: string) {
        this.chucvu$.next(chucvu)
    }

    public getIdFromStore() {
        return this.id$.asObservable()
    }

    public setIdForStore(id: number) {
        this.id$.next(id)
    }
}
