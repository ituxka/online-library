import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../state';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ol-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;

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
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { email, password } = this.signUpForm.value;
    this.authStoreService.signUp(email, password)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.snackBar.openSuccess('Register successful');
          this.router.navigate(['/']).then();
        },
        error: ({ error }) => this.snackBar.openError(error.message),
      });
  }

  onClear() {
    this.signUpForm.reset();
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

}
