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
                path: 'product',
                loadChildren: () => import('./Pages/product/product.module').then((m) => m.ProductModule)
            },
            {
                path: 'product-detail',
                loadChildren: () => import('./Pages/product-detail/product-detail.module').then((m) => m.ProductDetailModule)
            },
            {
                path: 'blog',
                loadChildren: () => import('./Pages/blog/blog.module').then((m) => m.BlogModule)
            },
            {
                path: 'blog-detail',
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
                        path: 'rank',
                        loadChildren: () => import('./Pages/profile/profile-rank/profile-rank.module').then((m) => m.ProfileRankModule)
                    },
                    {
                        path: 'money',
                        loadChildren: () => import('./Pages/profile/topping-fundas/topping-fundas.module').then((m) => m.ToppingFundasModule)
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./Pages/profile/profile-account/profile-account.module').then((m) => m.ProfileAccountModule)
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
                path: 'about',
                loadChildren: () => import('./Pages/about/about.module').then((m) => m.AboutModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./Pages/contact/contact.module').then((m) => m.ContactModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
