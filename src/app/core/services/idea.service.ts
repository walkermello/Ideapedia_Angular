import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseIdea } from '../interfaces/i-api-response';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    // Initialize apiUrl after baseHttpService is injected
    this.apiUrl = `${this.baseHttpService.baseURL}/idea`;
  }

  getIdeas(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'id',
    value: string = ''
  ): Observable<ApiResponseIdea> {
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}`;
    const params = new HttpParams()
      .set('size', size.toString())
      .set('col', column)
      .set('val', value);

    return this.http.get<ApiResponseIdea>(url, { params });
  }
}
