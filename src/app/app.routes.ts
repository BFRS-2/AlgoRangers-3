import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'collections/lightning-deals',
    loadComponent: () =>
      import('./lightning-deals/lightning-deals.component').then(
        (m) => m.LightningDealsComponent
      )
  },
  {
    path: 'collections/review-list',
    loadComponent: () =>
      import('./review-list-component/review-list-component.component').then(
        (m) => m.ReviewListComponentComponent
      )
  },
  {
    path: '**',
    redirectTo: 'collections/lightning-deals'
  }
];
