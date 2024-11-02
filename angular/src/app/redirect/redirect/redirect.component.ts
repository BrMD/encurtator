import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent implements OnInit {
  constructor(private service: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.service.redirect(this.router.url.split('/r/')[1]).subscribe({
      next: (response) => (window.location.href = response.url),
      error: (err) => this.router.navigate(['/']),
    });
  }
}
