import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../state';

@Component({
  selector: 'ol-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authStoreService: AuthStoreService,
  ) { }

  ngOnInit() {
    this.initForm();
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
    this.authStoreService.signUp(email, password).subscribe({
      next: () => alert('yay all good'),
      error: err => alert(err),
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
