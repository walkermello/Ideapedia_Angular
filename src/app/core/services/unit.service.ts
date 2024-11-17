import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { ApiResponseUnit } from '../interfaces/i-api-response';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/unit`;
  }

  getUnits(): Observable<ApiResponseUnit> {
    return this.http.get<ApiResponseUnit>(this.apiUrl);
  }
}
