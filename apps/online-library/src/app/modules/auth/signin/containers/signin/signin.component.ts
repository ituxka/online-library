import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../state';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ol-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;

  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authStoreService: AuthStoreService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  // must be present for untilDestroy operator
  ngOnDestroy() {
  }

  initForm() {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;
    this.authStoreService.signIn(email, password)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.snackBar.openSuccess('Signin successful');
          this.router.navigate(['/']).then();
        },
        error: () => this.snackBar.openError('Invalid credentials'),
      });
  }

  onClear() {
    this.signInForm.reset();
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
