import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthStore, AuthStoreService } from './state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthStore,
    AuthStoreService,
  ],
})
export class AuthModule { }
