import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { mismatch: true }
      : null;
  };
}
