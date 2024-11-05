import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { JwtAuthComponent } from '../jwt-auth/jwt-auth.component';
import { Auth0AuthComponent } from '../auth0-auth/auth0-auth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, CommonModule, JwtAuthComponent, Auth0AuthComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
