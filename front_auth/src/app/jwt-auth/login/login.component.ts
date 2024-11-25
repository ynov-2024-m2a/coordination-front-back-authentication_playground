import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  userInfo: any = null;
  tokenExpiry: string | null = null;
  selectedTabIndex = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http
        .post('http://localhost:3000/auth/login', this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            console.log('Connexion réussie:', res?.access_token);
            this.authService.saveToken(res.access_token);
            this.selectedTabIndex = 1;
            this.updateUserInfo();
          },
          error: () => alert('Échec de la connexion'),
        });
    }
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.updateUserInfo();
      this.selectedTabIndex = 1;
    }
  }

  onLogout() {
    this.authService.logout();
    this.selectedTabIndex = 0;
  }

  updateUserInfo() {
    const token = this.authService.getToken();
    if (token) {
      this.userInfo = this.authService.decodeToken(token);
      this.tokenExpiry = this.authService.getTimeRemaining();
      this.startTokenExpiryCountdown();
    }
  }

  startTokenExpiryCountdown() {
    if (this.tokenExpiry) {
      setInterval(() => {
        this.tokenExpiry = this.authService.getTimeRemaining();
        if (!this.tokenExpiry) {
          alert('Le token a expiré. Veuillez vous reconnecter.');
          this.onLogout();
        }
      }, 1000);
    }
  }
}
