import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account } from '../../models/account';
import { ApiService } from '../../service/api.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private service: ApiService,
    private authService: AuthService
  ) {}
  onRegister() {
    this.router.navigate(['pages/register']);
  }

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }

  onSubmitLogin() {
    if (this.formLogin.valid) {
      const loginData: Account = {
        email: this.formLogin.get('email')!.value!,
        password: this.formLogin.get('password')!.value!,
      };
      this.service.login(loginData).subscribe({
        error: (err) => console.log(err),
        next: (session) => {
          this.authService.setAccount(session.sessionId);
          this.router.navigate(['/']);
        },
      });
    }
  }
}
