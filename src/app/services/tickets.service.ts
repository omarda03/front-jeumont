import { Constants } from '../utils/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
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

  getAskedDataSF(sort: string): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '');
    return this.http.get(`${this.apiUrl}/asked`, { headers: this.getHeaders(), params });
  }

  getAskedAllData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/asked/all`, { headers: this.getHeaders() });
  }

  getAskedPrmaList(description: string): Observable<any> {
    let params = new HttpParams()

    if (description) {
      params = params.set('asked_description', description);
    }

    return this.http.get(`${this.apiUrl}/asked/list/prma`, { headers: this.getHeaders(), params });
  }

  getAskedPrfmList(description: string): Observable<any> {
    let params = new HttpParams()

    if (description) {
      params = params.set('asked_description', description);
    }

    return this.http.get(`${this.apiUrl}/asked/list/prfm`, { headers: this.getHeaders(), params });
  }

  getAskedPrfsList(description: string): Observable<any> {
    let params = new HttpParams()

    if (description) {
      params = params.set('asked_description', description);
    }

    return this.http.get(`${this.apiUrl}/asked/list/prfs`, { headers: this.getHeaders(), params });
  }

  getAskedDataClient(
    page: number, 
    description: string, 
    descriptionOption: number, 
    sort: string, 
    typeFilter: string, 
    statusFilter: number, 
    clientFilter: string, 
    sortOption: string, 
    itemSize: number,
    skillFilter: string,
    sideFilter: string,
    effectTypeFilter: string,
    levelFilter: string,
    effectFilter: string,
    tagFilter: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '')
      .set('item_size', itemSize || 40)
      .set('page', page || 1)
      .set('typeFilter', typeFilter );

    if (description) {
      params = params.set('asked_description', description);
    }

    if (descriptionOption) {
      params = params.set('description_option', descriptionOption);
    }

    if (statusFilter) {
      params = params.set('statusFilter', statusFilter);
    }

    if (clientFilter) {
      params = params.set('clientFilter', clientFilter);
    }

    if (sortOption) {
      params = params.set('sortOption', sortOption);
    }

    if (skillFilter) {
      params = params.set('skillFilter', skillFilter);
    }

    if (sideFilter) {
      params = params.set('sideFilter', sideFilter);
    }
    
    if (effectTypeFilter) {
      params = params.set('effectTypeFilter', effectTypeFilter);
    }
    
    if (levelFilter) {
      params = params.set('levelFilter', levelFilter);
    }

    if (effectFilter) {
      params = params.set('effectFilter', effectFilter);
    }
    
    if (tagFilter) {
      params = params.set('tagFilter', tagFilter);
    }

    return this.http.get(`${this.apiUrl}/asked/client`, { headers: this.getHeaders(), params });
  }

  getAskedDataClientFleet(page: number, description: string, descriptionOption: number, sort: string, typeFilter: string, statusFilter: number, fleetFilter: string, sortOption: string, itemSize: number): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '')
      .set('item_size', itemSize || 40)
      .set('page', page || 1)
      .set('typeFilter', typeFilter );

    if (description) {
      params = params.set('asked_description', description);
    }

    if (descriptionOption) {
      params = params.set('description_option', descriptionOption);
    }

    if (statusFilter) {
      params = params.set('statusFilter', statusFilter);
    }

    if (fleetFilter) {
      params = params.set('fleetFilter', fleetFilter);
    }

    if (sortOption) {
      params = params.set('sortOption', sortOption);
    }

    return this.http.get(`${this.apiUrl}/asked/fleet`, { headers: this.getHeaders(), params });
  }

  getAskedData(
    page: number, 
    description: string, 
    descriptionOption: number,
    sort: string, 
    typeFilter: string, 
    statusFilter: number, 
    clientFilter: string, 
    shipFilter: string, 
    sortOption: string, 
    itemSize: number,  
    startDate: string | undefined,
    endDate: string | undefined,
    skillFilter: string,
    sideFilter: string,
    effectTypeFilter: string,
    levelFilter: string,
    effectFilter: string,
    tagFilter: string,
    technicien_support: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('sort', sort || '')
      .set('item_size', itemSize || 40)
      .set('page', page || 1)
      .set('typeFilter', typeFilter);
      
    if (description) {
      params = params.set('asked_description', description);
    }

    if (descriptionOption) {
      params = params.set('description_option', descriptionOption);
    }

    if (statusFilter) {
      params = params.set('statusFilter', statusFilter);
    }

    if (clientFilter) {
      params = params.set('clientFilter', clientFilter);
    }

    if (shipFilter) {
      params = params.set('shipFilter', shipFilter);
    }

    if (sortOption) {
      params = params.set('sortOption', sortOption);
    }

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    if (skillFilter) {
      params = params.set('skillFilter', skillFilter);
    }
    
    if (sideFilter) {
      params = params.set('sideFilter', sideFilter);
    }
    
    if (effectTypeFilter) {
      params = params.set('effectTypeFilter', effectTypeFilter);
    }
    
    if (levelFilter) {
      params = params.set('levelFilter', levelFilter);
    }
    
    if (effectFilter) {
      params = params.set('effectFilter', effectFilter);
    }
    
    if (tagFilter) {
      params = params.set('tagFilter', tagFilter);
    }

    if (technicien_support) {
      params = params.set('technicienSupportFilter', technicien_support);
    }

    return this.http.get(`${this.apiUrl}/asked`, { headers: this.getHeaders(), params });
  }

  getAskedDataStatistics(
    selectedDuration: number, 
    client: string, 
    user: string,
    ship: string,    
    asked_type: string,
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('client', client)
      .set('user', user)
      .set('ship', ship)
      .set('asked_type', asked_type)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri);
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/statistics`, { headers: this.getHeaders(), params });
  }

  getAskedDataStatisticsClient(
    client: string,
    selectedDuration: number, 
    ship: string,    
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('client', client)
      .set('ship', ship)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri);
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/statistics/client`, { headers: this.getHeaders(), params});
  }

  getAskedDataStatisticsClientFleet(
    fleet: number,   
    selectedDuration: number, 
    ship: string,    
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('fleet', fleet)
      .set('ship', ship)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri);
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/statistics/fleet`, { headers: this.getHeaders(), params});
  }

  getAskedDataChart(
    selectedDuration: number, 
    client: string, 
    user: string,
    ship: string,    
    asked_type: string,
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('client', client)
      .set('user', user)
      .set('ship', ship)
      .set('asked_type', asked_type)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri);
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/chart`, { headers: this.getHeaders(), params });
  }

  getAskedDataChartClient(
    selectedDuration: number, 
    client: string, 
    ship: string,
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('client', client)
      .set('ship', ship)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri);
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/chart/client`, { headers: this.getHeaders(), params });
  }

  getAskedDataChartClientFleet(
    selectedDuration: number, 
    fleet: number, 
    ship: string,
    skill: number,
    effect: number,
    side: number,
    tag: number,
    effectType: number,
    level: number,
    ri: number,
    startDate: string | undefined,
    endDate: string | undefined,
  ): Observable<any> {
    let params = new HttpParams()
      .set('fleet', fleet)
      .set('ship', ship)
      .set('selectedDuration', selectedDuration)
      .set('skill', skill)
      .set('effect', effect)
      .set('side', side)
      .set('tag', tag)
      .set('effectType', effectType)
      .set('level', level)
      .set('ri', ri); 
    
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get(`${this.apiUrl}/asked/chart/fleet`, { headers: this.getHeaders(), params });
  }

  getOneAskedData(asked_uuid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/asked/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getOneAskedPRFSData(asked_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfs/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getOneAskedPRMAData(asked_uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prma/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getOneAskedPRFMData(asked_uuid: string) {
    return this.http.get(`${this.apiUrl}/prfm/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getAskedPRFM(): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfm`, { headers: this.getHeaders() });
  }

  getRelatedPrfs(asked_uuid: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/prfm/related/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getPrfsRelatedPrfs(asked_uuid: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/prfs/related/prfs/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getRelatedShips(asked_uuid: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/prfm/related/ship/${asked_uuid}`, { headers: this.getHeaders() });
  }

  getAskedPRFS(): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfs`, { headers: this.getHeaders() });
  }

  taggingUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asked/tagge`, data, { headers: this.getHeaders() });
  }

  createAskedPRMA(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prma`, data, { headers: this.getHeaders() });
  }

  findPRMAEqpInternals(asked_uuid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/prmaeqpinternal/${asked_uuid}`, { headers: this.getHeaders() });
  }

  createAskedPRMAEqpInternal(asked_uuid: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prmaeqpinternal/${asked_uuid}`, data, { headers: this.getHeaders() });
  }

  deletePRMAEqpInternals(ref: any) {
    return this.http.delete(`${this.apiUrl}/prmaeqpinternal/${ref}`, { headers: this.getHeaders() });
  }

  createAskedPRFS(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfs`, data, { headers: this.getHeaders() });
  }

  createAskedPRFM(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfm`, data, { headers: this.getHeaders() });
  }

  createAskedUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedusersincharge`, data, { headers: this.getHeaders() });
  }

  updateAskedPRFS(data: any, asked_uuid: string, user_uuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/prfs/update/prfs/${asked_uuid}/${user_uuid}`, data, { headers: this.getHeaders() });
  }

  updateAskedPRMA(data: any, asked_uuid: any, user_uuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/prma/${asked_uuid}/${user_uuid}`, data, { headers: this.getHeaders() });
  }

  updateAskedPRFM(data: any, asked_uuid: any, user_uuid: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/prfm/${asked_uuid}/${user_uuid}`, data, { headers: this.getHeaders() });
  }

  askedAddTag(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedTag`,  data ,{ headers: this.getHeaders() });
  }

  askedDeleteTag(tag_id: number, asked_uuid: string, user_uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/askedTag/${asked_uuid}/${tag_id}/${user_uuid}` ,{ headers: this.getHeaders() });
  }

  related(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfm/related`,  data ,{ headers: this.getHeaders() });
  }

  relatedPrfs(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfs/related/prfs`,  data ,{ headers: this.getHeaders() });
  }

  relatedShip(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prfm/related/ship`,  data ,{ headers: this.getHeaders() });
  }

  askedAddEvent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/askedEffect`,  data ,{ headers: this.getHeaders() });
  }

  askedDeleteEvent(effect_id: number, asked_uuid: string, user_uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/askedEffect/${asked_uuid}/${effect_id}/${user_uuid}` ,{ headers: this.getHeaders() });
  }

  uploadFile(formData: FormData, askedUuid: string, userUuid: string, cat: number) {
    return this.http.post(`${this.apiUrl}/prfs/upload/${askedUuid}/${userUuid}/${cat}`, formData, { headers: this.getHeaders() });
  }

  getAttachements(askedUuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prfs/attachement/${askedUuid}` ,{ headers: this.getHeaders() });
  }

  downloadAttachement(filename: string): Observable<Blob>  {
    return this.http.get(`${this.apiUrl}/prfs/attachement/files/${filename}` , {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }

  removeAttachement(attId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/prfs/attachement/${attId}` ,{ headers: this.getHeaders() });
  }

  deletePrfsRelatedToPrfm(data: any) {
    return this.http.delete(`${this.apiUrl}/prfm/related/${data.asked_prfs_uuid}/${data.asked_prfm_uuid}`,{ headers: this.getHeaders() });
  }

  deletePrfs(asked_uuid: String) {
    return this.http.delete(`${this.apiUrl}/prfs/${asked_uuid}`,{ headers: this.getHeaders() });
  }

  deletePrfsRelatedToPrfs(data: any) {
    return this.http.delete(`${this.apiUrl}/prfs/related/prfs/${data.parent_asked_uuid}/${data.child_asked_uuid}`,{ headers: this.getHeaders() });
  }

  deleteShipRelatedToPrfm(data: any) {
    return this.http.delete(`${this.apiUrl}/prfm/related/ship/${data.asked_uuid}/${data.ship_uuid}`,{ headers: this.getHeaders() });
  }
}
