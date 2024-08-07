import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../models/login';
import { ApiService } from '../../service/api.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private service: ApiService
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

  ngOnInit(): void {}

  onSubmitLogin() {
    if (this.formLogin.valid) {
      const loginData: Login = {
        email: this.formLogin.get('email')!.value!,
        password: this.formLogin.get('password')!.value!,
      };
      this.service.login(loginData).subscribe({
        error: () => console.log('error'),
        complete: () => console.log('deu bom'),
      });
    }
  }
}
