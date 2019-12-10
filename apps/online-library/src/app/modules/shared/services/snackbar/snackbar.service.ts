import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarConfig } from '@angular/material/snack-bar/typings/snack-bar-config';

@Injectable()
export class SnackbarService {
  private defaultConfig: MatSnackBarConfig = {
    verticalPosition: 'top',
  };

  private successConfig: MatSnackBarConfig = {
    ...this.defaultConfig,
    duration: 2000,
    panelClass: ['success'],
  };

  private errorConfig: MatSnackBarConfig = {
    ...this.defaultConfig,
    panelClass: ['error'],
  };

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  openSuccess(
    message: string,
    action: string = '',
    config: MatSnackBarConfig = this.successConfig,
  ) {
    this.snackBar.open(message, action, config);
  }

  openError(
    message: string,
    action: string = 'dismiss',
    config: MatSnackBarConfig = this.errorConfig,
  ) {
    this.snackBar.open(message, action, config);
  }
}
