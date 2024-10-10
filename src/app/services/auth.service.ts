import { Constants } from '../utils/constants'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = Constants.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  forget(email: string) {
    const forgetData = { email };

    return this.http.post<any>(`${this.apiUrl}/auth/forget`, forgetData);
  }

  login(email: string, password: string) {
    const loginData = { email, password };

    return this.http.post<any>(`${this.apiUrl}/auth/token`, loginData).pipe(
      tap((response) => {
        const { accessToken } = response;
        this.cookieService.set('access_token', accessToken);
        this.cookieService.set('user_uuid', this.getUserId());
        
        const roleUser = this.getUserRole();
  
        if (roleUser === 1 || roleUser === 2 || roleUser === 3 || roleUser === 4) {
          this.router.navigate(['/']); 
        } else if (roleUser === 10 || roleUser === 11 || roleUser === 12) {
          this.router.navigate(['/client']);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return this.cookieService.get('access_token');
  }

  getUserId(): string {
    const token = this.getToken();
    if (token) { 
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.id || null;
    } else { return '' }
  }

  getUserRole(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role || null;
    } else { return 0 }
  }

  hasRole(role: number): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('user_uuid');
    this.router.navigate(['/login']); 
  }
}
