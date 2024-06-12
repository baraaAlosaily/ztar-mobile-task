import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService,PasswordValidatorService } from '../../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  fb=inject(FormBuilder);
  pv=inject(PasswordValidatorService);
  as=inject(AuthService);
  router=inject(Router);

  public message = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.as.user$.subscribe((user:any)=>{
      if(user){
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Form is valid',this.loginForm.value);
      this.as.login({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password??''
      }).subscribe({
        next: (res)=>{
          console.log('User logged in successfully',res)
          this.router.navigate(['/']);
        },
        error: (err)=>{
          console.error('Error logging in user',err)
          this.message = err;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

}
