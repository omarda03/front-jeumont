import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TagsService {
  
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

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`, { headers: this.getHeaders() });
  }

  createTag(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tags`, data, { headers: this.getHeaders() });
  }

  editTag(data: any, tagId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/tags/${tagId}`, data, { headers: this.getHeaders() });
  }

  deleteTag(tagId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tags/${tagId}`, { headers: this.getHeaders() });
  }
}
