import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthStoreService } from './state';
import { SharedModule } from '../shared/shared.module';
import { IfSignedInDirective } from './if-signed-in.directive';
import { IfHasRoleDirective } from './if-has-role.directive';

@NgModule({
  declarations: [
    IfSignedInDirective,
    IfHasRoleDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthStoreService,
  ],
  exports: [
    IfSignedInDirective,
    IfHasRoleDirective,
  ],
})
export class AuthModule { }
