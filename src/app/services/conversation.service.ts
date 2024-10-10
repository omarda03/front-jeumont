import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {

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
  
  createConversation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conversations`, data, { headers: this.getHeaders() });
  }

  findConversationByAsked(askedUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversations/${askedUuid}`, { headers: this.getHeaders() });
  }
}
