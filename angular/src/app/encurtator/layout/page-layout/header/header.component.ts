import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  onShortenedList() {
    this.router.navigate(['shortenedList'], { relativeTo: this.route });
  }
  loggedAccount = this.authService.getEmail();
  onHome() {
    this.router.navigate(['']);
  }

  onLogin() {
    this.router.navigate(['pages']);
  }

  onLogout() {
    this.authService.clearAccount();
    window.location.reload();
  }
}
