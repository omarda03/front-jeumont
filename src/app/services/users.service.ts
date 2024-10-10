import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Constants } from '../utils/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  private apiUrl = Constants.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const accessToken = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`, { headers: this.getHeaders() });
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data, { headers: this.getHeaders() });
  }

  editUser(data: any, userUuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userUuid}`, data, { headers: this.getHeaders() });
  }

  editPasswordUser(data: any, userUuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/password/${userUuid}`, data, { headers: this.getHeaders() });
  }

  deleteUser(userUuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userUuid}`, { headers: this.getHeaders() });
  }

  findUserById(user_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${user_uuid}`, { headers: this.getHeaders() });
  }

  findUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/email/${email}`, { headers: this.getHeaders() });
  }

  findUserSTFSL(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/stfsm`, { headers: this.getHeaders() });
  }

  findUsers(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.apiUrl}/users`, { headers: this.getHeaders(), params: params });
  }

  findUsersTech(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.apiUrl}/users/support/all`, { headers: this.getHeaders(), params: params });
  }
}
