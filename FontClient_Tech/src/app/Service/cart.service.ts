import { Injectable } from '@angular/core'
import { ICart } from '../Models/cart'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}
    cartItems: ICart[] = []

    private productsSubject = new BehaviorSubject<any[]>([])
    products$ = this.productsSubject.asObservable()

    getCartItem() {
        return this.cartItems
    }

    saveCart() {
        localStorage.setItem('cart_items', JSON.stringify(this.cartItems))
    }

    addToCart(product: any) {
        const existingItem = this.cartItems.find((item) => item.id === product.id)

        if (existingItem) {
            existingItem.soLuong++
        } else {
            const newItem: ICart = {
                id: product.id,
                tenSanPham: product.tenSanPham,
                image: product.avatar,
                thanhTien: product.giaBan - product.giamGia,
                soLuong: 1
            }
            this.cartItems.push(newItem)
        }
        this.productsSubject.next(this.cartItems)
        this.saveCart()
    }

    addToCartDetail(product: any, quantity: number) {
        const existingItem = this.cartItems.find((item) => item.id === product.id)

        if (existingItem) {
            existingItem.soLuong += quantity
        } else {
            const newItem: ICart = {
                id: product.id,
                tenSanPham: product.tenSanPham,
                image: product.avatar,
                thanhTien: product.giaBan - product.giamGia,
                soLuong: quantity
            }
            this.cartItems.push(newItem)
        }
        this.productsSubject.next(this.cartItems)
        this.saveCart()
    }
    getQuantity(): number {
        return this.cartItems.length
    }

    incrementQuantity(product: any) {
        product.soLuong += 1
        this.updateCart()
    }

    decrementQuantity(product: any) {
        if (product.soLuong > 1) {
            product.soLuong -= 1
            this.updateCart()
        }
    }

    private updateCart() {
        this.productsSubject.next([...this.cartItems])
        this.saveCart()
        this.getTotalPrice()
        this.getQuantity()
    }

    getTotalPrice(): number {
        return this.cartItems.reduce((total, product) => {
            const discountedPrice = product.thanhTien
            return total + discountedPrice * product.soLuong
        }, 0)
    }

    loadCart() {
        this.cartItems = JSON.parse(localStorage.getItem('cart_items') as any) || []
    }

    productInCart(product: any) {
        return this.cartItems.findIndex((x: any) => x.id === product.id) > -1
    }

    removeProduct(product: any) {
        const index = this.cartItems.findIndex((x: any) => x.id === product.id)
        if (index > -1) {
            this.cartItems.splice(index, 1)
            this.updateCart()
        }
    }

    clearProducts() {
        localStorage.setItem('cart_items', JSON.stringify([]))
        this.cartItems = []
        this.getTotalPrice
        this.updateCart()
    }
}
