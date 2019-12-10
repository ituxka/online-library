import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthQuery, AuthStore, AuthStoreService } from './state';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';

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
    AuthQuery,
    AuthGuard,
  ],
})
export class AuthModule { }
