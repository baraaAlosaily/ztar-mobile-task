import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth/auth.service';
import { PasswordValidatorService } from '../../../services/passwordValidator/password-validator.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: any;
  let routerStub: any;
  let passwordValidatorServiceStub: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    // Create stubs for dependencies
    authServiceStub = {
      user$: of(null),
      login: jasmine.createSpy('login').and.returnValue(of({}))
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    passwordValidatorServiceStub = {
      passwordMatchValidator: jasmine.createSpy('passwordMatchValidator')
    };

    formBuilder = new FormBuilder();

    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => null
        }
      }
    };

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: PasswordValidatorService, useValue: passwordValidatorServiceStub },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ActivatedRoute, useValue: activatedRouteStub }  // Provide the mock ActivatedRoute
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should validate form invalidity', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should validate form validity', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'Password1!' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should login and navigate on valid form submission', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'Password1!' });
    component.login();
    expect(authServiceStub.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password1!' });
  });

  it('should display error message on login failure', () => {
    authServiceStub.login.and.returnValue(throwError('Login error'));
    component.loginForm.setValue({ email: 'test@example.com', password: 'Password1!' });
    component.login();
    expect(component.message).toBe('Login error');
    expect(routerStub.navigate).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched if form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.login();
    expect(component.loginForm.touched).toBeTrue();
    expect(authServiceStub.login).not.toHaveBeenCalled();
  });
});
