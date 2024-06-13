import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, PasswordValidatorService } from '../../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  pv = inject(PasswordValidatorService);
  as = inject(AuthService);
  router = inject(Router);

  public message = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.as.user$.subscribe((user: any) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.as
        .login({
          email: this.loginForm.value.email ?? '',
          password: this.loginForm.value.password ?? '',
        })
        .subscribe({
          next: (res) => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error logging in user', err);
            this.message = err;
            setTimeout(() => {
              this.message = '';
            }, 3000);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
