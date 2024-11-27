import { Component } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-jwt-auth',
  standalone: true,
  imports: [MatTabGroup, MatTabsModule, RegisterComponent, LoginComponent],
  templateUrl: './jwt-auth.component.html',
  styleUrl: './jwt-auth.component.scss',
})
export class JwtAuthComponent {}
