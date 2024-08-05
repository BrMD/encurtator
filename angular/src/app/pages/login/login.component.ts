import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder
  ) {}
  onRegister() {
    this.router.navigate(['pages/register']);
  }
  ngOnInit(): void {
    const login: Login = this.route.snapshot.data['login'];
    this.formLogin = this.formBuilder.group({
      name: [
        login.email,
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      password: [login.password, [Validators.required]],
    });
  }

  onLogin() {}
}
