import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router) {}
  onLogin() {
    this.router.navigate(['pages/login']);
  }
}
