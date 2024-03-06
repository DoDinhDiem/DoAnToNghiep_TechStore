import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './Client/layout/layout.component'
import { ProfileComponent } from './Pages/profile/profile.component'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./Pages/home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'product/:id',
                loadChildren: () => import('./Pages/product/product.module').then((m) => m.ProductModule)
            },
            {
                path: 'product-detail/:id',
                loadChildren: () => import('./Pages/product-detail/product-detail.module').then((m) => m.ProductDetailModule)
            },
            {
                path: 'blog/:id',
                loadChildren: () => import('./Pages/blog/blog.module').then((m) => m.BlogModule)
            },
            {
                path: 'blog-detail/:id',
                loadChildren: () => import('./Pages/blog-detail/blog-detail.module').then((m) => m.BlogDetailModule)
            },
            {
                path: 'shopping-cart',
                loadChildren: () => import('./Pages/shopping-cart/shopping-cart.module').then((m) => m.ShoppingCartModule)
            },
            {
                path: 'profile',
                component: ProfileComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./Pages/profile/profile-home/profile-home.module').then((m) => m.ProfileHomeModule)
                    },
                    {
                        path: 'history',
                        loadChildren: () => import('./Pages/profile/profile-history/profile-history.module').then((m) => m.ProfileHistoryModule)
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./Pages/profile/profile-account/profile-account.module').then((m) => m.ProfileAccountModule)
                    },
                    {
                        path: 'change-password',
                        loadChildren: () => import('./Pages/profile/change-password/change-password.module').then((m) => m.ChangePasswordModule)
                    }
                ]
            },
            {
                path: 'checkout',
                loadChildren: () => import('./Pages/check-out/check-out.module').then((m) => m.CheckOutModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./Pages/account/account.module').then((m) => m.AccountModule)
            },
            {
                path: 'signup',
                loadChildren: () => import('./Pages/sign-up/sign-up.module').then((m) => m.SignUpModule)
            },
            {
                path: 'confinmail',
                loadChildren: () => import('./Pages/confim-mail/confim-mail.module').then((m) => m.ConfimMailModule)
            },
            {
                path: 'forgotpass',
                loadChildren: () => import('./Pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
            },
            {
                path: 'about',
                loadChildren: () => import('./Pages/about/about.module').then((m) => m.AboutModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./Pages/contact/contact.module').then((m) => m.ContactModule)
            },
            {
                path: 'search/:searchTerm',
                loadChildren: () => import('./Pages/search/search.module').then((m) => m.SearchModule)
            },
            {
                path: 'success',
                loadChildren: () => import('./Pages/success/success.module').then((m) => m.SuccessModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
