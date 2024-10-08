import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css',
})
export class PageLayoutComponent {}
