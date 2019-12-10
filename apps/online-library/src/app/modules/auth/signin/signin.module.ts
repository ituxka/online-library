import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './containers/signin/signin.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    MaterialModule,
  ],
})
export class SigninModule { }
