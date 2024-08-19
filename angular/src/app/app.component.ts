import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TitleComponent } from './components/title/title.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'encurtator';
  constructor(private authService: AuthService) {}
  veryfySession() {
    const email = localStorage.getItem('sessionId');
    if (email) {
      this.authService.setAccount(email);
    }
  }
  ngOnInit(): void {
    this.veryfySession();
  }
}
