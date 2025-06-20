import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LightningDealsService {
  constructor(private http: HttpClient) {}

  getDeals(): Observable<any> {
    return this.http.get('https://api.zop.in/api/lightning-deals'); // example endpoint
  }
}
