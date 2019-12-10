import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../state';
import { SnackbarService } from '../../../../shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ol-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
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
    this.authStoreService.signIn(email, password).subscribe({
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
