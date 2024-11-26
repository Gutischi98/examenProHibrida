import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'crear-publicacion',
    loadComponent: () => import('./crear-publicacion/crear-publicacion.page').then((m) => m.CrearPublicacionPage),
  },
];
