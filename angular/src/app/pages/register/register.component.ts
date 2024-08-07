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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private service: ApiService
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
      const loginData: Account = {
        email: this.formRegister.get('email')!.value!,
        password: this.formRegister.get('password')!.value!,
      };
      this.service.login(loginData).subscribe({
        error: () => console.log('error'),
        complete: () => console.log('deu bom'),
      });
    }
  }
}
