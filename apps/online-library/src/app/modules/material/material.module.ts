import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule { }
