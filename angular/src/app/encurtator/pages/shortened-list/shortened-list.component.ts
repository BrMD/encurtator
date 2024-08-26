import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-shortened-list',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './shortened-list.component.html',
  styleUrl: './shortened-list.component.css',
})
export class ShortenedListComponent implements OnInit {
  constructor(private service: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    const loggedAccount = this.authService.getAccount();
    if (loggedAccount !== null) {
      this.service.getEncurtatorsbyId(loggedAccount).subscribe({
        next: (arrayEnc) => console.log(arrayEnc),
        error: (err) => console.error(err),
      });
    }
  }
}
