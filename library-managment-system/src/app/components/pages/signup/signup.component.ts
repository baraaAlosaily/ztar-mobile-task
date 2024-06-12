import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordValidatorService } from '../../../services';
import { AuthService } from '../../../services';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  fb=inject(FormBuilder);
  pv=inject(PasswordValidatorService);
  as=inject(AuthService);
  router=inject(Router);
  public message = '';

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['',
      [ Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,}$')]
      ],
    confirmPassword: ['', Validators.required]
  }, { validator: this.pv.passwordMatchValidator});

  ngOnInit(): void {
    this.as.user$.subscribe((user:any)=>{
      if(user){
        this.router.navigate(['/']);
      }
    });
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('Form is valid',this.signupForm.value);
      this.as.register({
        email: this.signupForm.value.email,
        username: this.signupForm.value.firstName + ' ' + this.signupForm.value.lastName,
        password: this.signupForm.value.password
      }).subscribe({
        next: (res) => {
          console.log('User registered successfully',res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error registering user',err);
          this.message = err
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
