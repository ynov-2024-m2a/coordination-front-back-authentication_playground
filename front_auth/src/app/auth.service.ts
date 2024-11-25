import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private authToken = new BehaviorSubject<string | null>(null);
  private loggedIn = false;
  private tokenKey = 'token';
  public userInfo: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.authToken.next(token);
        localStorage.setItem('authToken', token);
        this.loggedIn = true;
      })
    );
  }

  // Vérifie si un utilisateur est connecté
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.userInfo = this.decodeToken(token);
      return true;
    }
    return false;
  }

  // Récupère le token depuis localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Décode un token JWT
  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      console.log('Token décodé :', decoded); // Vérifiez que les informations utilisateur s'affichent correctement
      return decoded;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  // Vérifie si un token est expiré
  isTokenExpired(token: string): boolean {
    const decoded: any = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  // Enregistre le token dans localStorage
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.userInfo = this.decodeToken(token);
  }

  // Déconnexion
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userInfo = null;
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  getTokenExpirationTime(token: string): number | null {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 : null; // exp est en secondes, converti en ms
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getTimeRemaining(): string | null {
    const token = this.getToken();
    if (token) {
      const expirationTime = this.getTokenExpirationTime(token);
      if (expirationTime) {
        const timeLeft = expirationTime - Date.now();
        return timeLeft > 0 ? this.formatTime(timeLeft) : null; // Retourne le temps restant
      }
    }
    return null;
  }

  private formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes} min ${seconds} sec`;
  }

  // logout() {
  //   this.loggedIn = false;
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('authToken');
  // }

  // isAuthenticated(): boolean {
  //   return this.loggedIn;
  // }
}
