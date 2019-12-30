import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/layout/nav/nav.component';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './containers/home/home.component';
import { AuthModule } from './modules/auth/auth.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { BookModule } from './modules/book/book.module';
import { SocketIoModule } from 'ngx-socket-io';
import { UserModule } from './modules/user/user.module';
import { CheckoutModule } from './modules/checkout/checkout.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    BookModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    SocketIoModule.forRoot({ url: 'http://localhost:3333' }),
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
