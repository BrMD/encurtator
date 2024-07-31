import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'encurtator' },
  {
    path: 'encurtator',
    loadChildren: () =>
      import('./encurtator/encurtator.module').then((m) => m.EncurtatorModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
];
