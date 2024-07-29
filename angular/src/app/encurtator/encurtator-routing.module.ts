import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ShortenedListComponent } from './pages/shortened-list/shortened-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  { path: 'shortenedList', component: ShortenedListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncurtatorRoutingModule {}
