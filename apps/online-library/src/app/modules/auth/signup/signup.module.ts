import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './containers/singup/signup.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
  ],
})
export class SignupModule { }
