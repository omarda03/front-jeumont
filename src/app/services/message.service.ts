import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
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
  
  findMessagesByConversation(ConversationUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/conversation/${ConversationUuid}`, { headers: this.getHeaders() });
  }

  findMessagesByClient(user_uuid: string, ship_uuid: string, page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page || 1)
      .set('pageSize', pageSize || 10)
      .set('ship_uuid', ship_uuid);

    return this.http.get(`${this.apiUrl}/messages/client/${user_uuid}`, { headers: this.getHeaders(), params });
  }

  createMessage(message: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages/`, message, { headers: this.getHeaders() });
  }

  deleteMessage(message_id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/messages/${message_id}`,  { headers: this.getHeaders() });
  }  
}
