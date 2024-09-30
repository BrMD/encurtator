import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Account } from '../../models/account';
import { confirmPasswordValidator } from './customValidatorConfirmPassword';
import { NgIf } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule, NgIf, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading = false;
  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private service: ApiService,
    private authService: AuthService
  ) {}

  onLogin() {
    this.router.navigate(['pages/login']);
  }
  formRegister = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: confirmPasswordValidator }
  );

  get email() {
    return this.formRegister.get('email') as FormControl;
  }

  get password() {
    return this.formRegister.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formRegister.get('confirmPassword') as FormControl;
  }
  onSubmitLogin() {
    if (this.formRegister.valid) {
      const registerData: Account = {
        email: this.formRegister.get('email')!.value!,
        password: this.formRegister.get('password')!.value!,
      };
      const confirmPassword = this.formRegister.get('confirmPassword')?.value;
      if (confirmPassword && confirmPassword === registerData.password) {
        this.loading = true;
        this.service.createUser(registerData).subscribe({
          error: () => console.log('error'),
          complete: () => {
            this.service.createUser(registerData);
            this.authService.setAccount(registerData.email);
            this.router.navigate(['/']);
          },
        });
      }
    }
  }
}
