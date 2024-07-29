import { Component } from '@angular/core';
import { TitleComponent } from '../../../components/title/title.component';
import { FormComponent } from '../../../components/form/form.component';
import { PageLayoutComponent } from '../../layout/page-layout/page-layout.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TitleComponent, FormComponent, PageLayoutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
