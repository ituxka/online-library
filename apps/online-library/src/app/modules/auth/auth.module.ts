import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthStore, AuthStoreService } from './state';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthStore,
    AuthStoreService,
  ],
})
export class AuthModule { }
