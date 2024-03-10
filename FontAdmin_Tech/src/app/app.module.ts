import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutModule } from './Layout/layout/layout.module'
import { NgToastModule } from 'ng-angular-popup'
import { TokenInterceptor } from './Interceptors/Token.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LayoutModule, NgToastModule],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
