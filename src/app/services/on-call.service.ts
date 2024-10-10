import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OnCallService {
  
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
  
  createOnCall(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/oncall`, data, { headers: this.getHeaders() });
  }

  findOnCalls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/oncall`, { headers: this.getHeaders() });
  }

  findOnCallsBySemaine(week: number, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/oncall/${week}/${year}`, { headers: this.getHeaders() });
  }

  findOnCallsById(user: string, week: number, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/oncall/user/${user}/${week}/${year}`, { headers: this.getHeaders() });
  }

  putOnCallsById(call_uuid: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/oncall/user/${call_uuid}`, data,{ headers: this.getHeaders() });
  }

  deleteOnCallsById(call_uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/oncall/user/${call_uuid}`, { headers: this.getHeaders() });
  }

  findOnChangeId(asked: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedusersincharge/${asked}`, { headers: this.getHeaders() });
  }
}