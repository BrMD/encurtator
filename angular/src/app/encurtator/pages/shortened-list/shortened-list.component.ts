import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../../service/auth.service';
import { EncurtatorResult } from '../../../models/encurtator';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-shortened-list',
  standalone: true,
  imports: [PageLayoutComponent, NgForOf],
  templateUrl: './shortened-list.component.html',
  styleUrl: './shortened-list.component.css',
})
export class ShortenedListComponent implements OnInit {
  encurtators: EncurtatorResult[] = [];
  constructor(private service: ApiService, private authService: AuthService) {}

  onDelete(id: String) {
    console.log('aqui');
    this.service.deleteEncurtator(id).subscribe({
      next: () => console.log('aooo'),
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    const loggedAccount = this.authService.getAccount();
    if (loggedAccount !== null) {
      this.service.getEncurtatorsbyId(loggedAccount).subscribe({
        next: (arrayEnc) => (this.encurtators = arrayEnc),
        error: (err) => console.error(err),
      });
    }
  }
}
