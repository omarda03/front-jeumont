import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  
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

  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, data, { headers: this.getHeaders() });
  }

  getCustomers(searchQuery: string): Observable<any> {
    const queryParams = searchQuery ? `?name=${searchQuery}` : '';
    return this.http.get(`${this.apiUrl}/customers${queryParams}`, { headers: this.getHeaders() });
  }

  getCustomerById(customerUuid: string) {
    return this.http.get(`${this.apiUrl}/customers/${customerUuid}`, { headers: this.getHeaders() });
  }

  getFleetByCustomer(customerUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/fleets/customer/${customerUuid}`, { headers: this.getHeaders() });
  }

  getShipByCustomer(customerUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/customer/${customerUuid}`, { headers: this.getHeaders() });
  }

  getShipByFleet(fleet_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/fleet/${fleet_id}`, { headers: this.getHeaders() });
  }

  getShipByUser(userUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/user/${userUuid}`, { headers: this.getHeaders() });
  }

  getFleetByUser(user_uuid: string) : Observable<any> {
    return this.http.get(`${this.apiUrl}/fleetuser/${user_uuid}`, { headers: this.getHeaders() });
  }


}
