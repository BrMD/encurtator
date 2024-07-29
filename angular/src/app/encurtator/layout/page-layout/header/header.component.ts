import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onShortenedList() {
    this.router.navigate(['shortenedList'], { relativeTo: this.route });
  }
}
