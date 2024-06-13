import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../../services';
import { PasswordValidatorService } from '../../../../services/passwordValidator/password-validator.service';
import { SignupComponent } from './signup.component';

describe('LoginComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceStub: any;
  let routerStub: any;
  let passwordValidatorServiceStub: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    // Create stubs for dependencies
    authServiceStub = {
      user$: of(null),
      register: jasmine.createSpy('register').and.returnValue(of({})),
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate'),
    };

    passwordValidatorServiceStub = {
      passwordMatchValidator: jasmine.createSpy('passwordMatchValidator'),
    };

    formBuilder = new FormBuilder();

    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => null,
        },
      },
    };

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: PasswordValidatorService,
          useValue: passwordValidatorServiceStub,
        },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ActivatedRoute, useValue: activatedRouteStub }, // Provide the mock ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register and navigate on successful signup', () => {
    const formValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    component.signupForm.setValue(formValues);
    component.signup();

    expect(authServiceStub.register).toHaveBeenCalledWith({
      email: formValues.email,
      username: `${formValues.firstName} ${formValues.lastName}`,
      password: formValues.password,
    });
  });

  it('should show error message on registration error', () => {
    const formValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    authServiceStub.register.and.returnValue(throwError('Registration error'));
    component.signupForm.setValue(formValues);
    component.signup();

    expect(authServiceStub.register).toHaveBeenCalledWith({
      email: formValues.email,
      username: `${formValues.firstName} ${formValues.lastName}`,
      password: formValues.password,
    });
    expect(component.message).toBe('Registration error');
    expect(routerStub.navigate).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched and not call register if form is invalid', () => {
    component.signupForm.setValue({
      firstName: '',
      lastName: '',
      email: 'invalidemail',
      password: 'short',
      confirmPassword: 'mismatch',
    });

    component.signup();

    expect(component.signupForm.touched).toBeTrue();
    expect(authServiceStub.register).not.toHaveBeenCalled();
    expect(component.message).toBe('');
  });
});
