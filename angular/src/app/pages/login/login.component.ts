import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../models/login';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private service: ApiService
  ) {}
  onRegister() {
    this.router.navigate(['pages/register']);
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
