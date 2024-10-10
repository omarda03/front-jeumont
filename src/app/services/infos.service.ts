import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../utils/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class InfosService {

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

  getShips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships`, { headers: this.getHeaders() });
  }

  getShip(idShip: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/${idShip}`, { headers: this.getHeaders() });
  }

  getUsersSkill(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userSkills`, { headers: this.getHeaders() });
  }

  getEffectTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/effectTypes`, { headers: this.getHeaders() });
  }

  findPieceById(piece_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/piece/${piece_uuid}`, { headers: this.getHeaders() });
  }

  getPieces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/piece`, { headers: this.getHeaders() });
  }

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects`, { headers: this.getHeaders() });
  }

  createPiece(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/piece`, data, { headers: this.getHeaders() });
  }

  findEquipementInterneById(piece_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/equipementinterne/${piece_uuid}`, { headers: this.getHeaders() });
  }

  getEquipementsinterne(): Observable<any> {
    return this.http.get(`${this.apiUrl}/equipementinterne`, { headers: this.getHeaders() });
  }

  getSides(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sides`, { headers: this.getHeaders() });
  }

  getSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills`, { headers: this.getHeaders() });
  }

  getUserSkill(user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/userSkills/${user}`, { headers: this.getHeaders() });
  }

  getLevels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/levels`, { headers: this.getHeaders() });
  }

  getEffects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/effects`, { headers: this.getHeaders() });
  }

  getEffectById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/effects/${id}`, { headers: this.getHeaders() });
  }

  getLogsByAsked(idAsked: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedlogs/${idAsked}`, { headers: this.getHeaders() });
  } 

  getAllAskedLogType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedlogtypes`, { headers: this.getHeaders() });
  }

  getAllAskedLog(page: number, pageSize: number, selectedLogType: number, startDate: any, endDate: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page || 1)
      .set('pageSize', pageSize || 10)
      .set('selectedLogType', selectedLogType)
      .set('startDate', startDate)
      .set('endDate', endDate)
  
    return this.http.get(`${this.apiUrl}/askedlogs/list`, { headers: this.getHeaders(), params });
  }

  getLastLogAsked(): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedlogs/last/log`, { headers: this.getHeaders() });
  }
  
  getLogAsked(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedlogs/${id}`, { headers: this.getHeaders() });
  } 

  getLogAskedUser(id: string, user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedlogs/${id}/user/${user}`, { headers: this.getHeaders() });
  } 

  getEffectsByAsked(idAsked: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedEffect/${idAsked}`, { headers: this.getHeaders() });
  } 

  getTagsByAsked(idAsked: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/askedTag/${idAsked}`, { headers: this.getHeaders() });
  } 

  getStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`, { headers: this.getHeaders() });
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers`, { headers: this.getHeaders() });
  }

  getCtageories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`, { headers: this.getHeaders() });
  }

  getDocumentsByClient(client: string): Observable<any> {
    let params = new HttpParams()
      .set('client', client);

    return this.http.get(`${this.apiUrl}/documents/client`, { headers: this.getHeaders(), params });
  }

  getDocumentsByShip(ship: string, page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page || 1)
      .set('pageSize', pageSize || 10)

    return this.http.get(`${this.apiUrl}/documentinterneship/${ship}`, { headers: this.getHeaders(), params  });
  }

  getDocumentsAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents/all`, { headers: this.getHeaders() });
  }

  createDocument(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/documents`, data, { headers: this.getHeaders() });
  }

  getDocuments(
    page: number, 
    pageSize: number,
    containsText: string, 
    doesNotContainText: string,
    linkedWordsText: string,
    selectedCategory: number, 
    minSize: number, 
    maxSize: number,
    startDate: any,
    endDate: any
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page || 1)
      .set('pageSize', pageSize || 10)
      .set('containsText', containsText)
      .set('doesNotContainText', doesNotContainText)
      .set('linkedWordsText', linkedWordsText)
      .set('selectedCategory', selectedCategory)
      .set('minSize', minSize)
      .set('maxSize', maxSize)
      .set('startDate', startDate)
      .set('endDate', endDate)
    return this.http.get(`${this.apiUrl}/documents`, { headers: this.getHeaders(), params });
  }

  getFleets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fleets`, { headers: this.getHeaders() });
  }

  getFleetsByCustomer(idCustomer: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/fleets/customer/${idCustomer}`, { headers: this.getHeaders() });
  }

  sendFeedback(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/feedback/send`, data, { headers: this.getHeaders() });
  }

  createShip(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ships`, data, { headers: this.getHeaders() });
  }

  sendRapport(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/prfs/cron/rapport`, data, { headers: this.getHeaders() });
  }

  updateShip(data: any, idShip: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/ships/${idShip}`, data, { headers: this.getHeaders() });
  }

  updatePiece(data: any, idPiece: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/piece/${idPiece}`, data, { headers: this.getHeaders() });
  }

  updateDocument(data: any, idDocument: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/documents/${idDocument}`, data, { headers: this.getHeaders() });
  }

  deleteShip(idShip: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ships/${idShip}`, { headers: this.getHeaders() });
  }

  deletePiece(idPiece: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/piece/${idPiece}`, { headers: this.getHeaders() });
  }

  deleteDocument(idDocument: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${idDocument}`, { headers: this.getHeaders() });
  }

  createFleet(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fleets`, data, { headers: this.getHeaders() });
  }

  updateFleet(data: any, idFleet: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/fleets/${idFleet}`, data, { headers: this.getHeaders() });
  }

  getShipsByFleet(idFleet: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/fleet/${idFleet}`, { headers: this.getHeaders() });
  }

  getShipsByCustomer(uuidCustomer: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ships/customer/${uuidCustomer}`, { headers: this.getHeaders() });
  }

  getWeeks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/weeks`, { headers: this.getHeaders() });
  }
  
  getYears(): Observable<any> {
    return this.http.get(`${this.apiUrl}/years`, { headers: this.getHeaders() });
  }
}
