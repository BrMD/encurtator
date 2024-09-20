import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { Observable } from 'rxjs';
import { infoUser } from '../../../../models/infoUser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, SpinnerComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  onShortenedList() {
    this.router.navigate(['shortenedList'], { relativeTo: this.route });
  }
  sessionId = localStorage.getItem('sessionId');
  loggedEmail$: Observable<infoUser> | null = null;
  loggedAccount = this.authService.getAccount();

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

  ngOnInit(): void {
    if (this.sessionId) {
      this.loggedEmail$ = this.authService.getEmailObservable(this.sessionId);
    }
  }
}
