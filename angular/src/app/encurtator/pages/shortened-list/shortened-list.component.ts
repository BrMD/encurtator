import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';

@Component({
  selector: 'app-shortened-list',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './shortened-list.component.html',
  styleUrl: './shortened-list.component.css',
})
export class ShortenedListComponent {}
