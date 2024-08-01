import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../encurtator/layout/page-layout/page-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}
  onRegister() {
    this.router.navigate(['pages/register']);
  }
}
