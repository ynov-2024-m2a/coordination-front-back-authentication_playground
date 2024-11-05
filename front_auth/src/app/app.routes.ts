import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JwtAuthComponent } from './jwt-auth/jwt-auth.component';
import { Auth0AuthComponent } from './auth0-auth/auth0-auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jwt-auth', component: JwtAuthComponent },
  { path: 'auth0-auth', component: Auth0AuthComponent },
  { path: '**', redirectTo: '' },
];
