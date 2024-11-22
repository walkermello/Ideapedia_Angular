import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponseDetailIdea } from '../interfaces/i-api-response';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/detail`;
  }

  getDetails(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'status',
    value: string = 'New Entry'
  ): Observable<ApiResponseDetailIdea> {
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}?size=${size}&col=${column}&val=${value}`;
    console.log('Constructed URL: ', url);

    const token = localStorage.getItem('authToken'); // Konsisten dengan nama kunci di local storage
    console.log('Retrieved Token from Local Storage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`, // Gunakan token atau string kosong jika token tidak ditemukan
    });

    return this.http
      .get<ApiResponseDetailIdea>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  getApproved(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'status',
    value: string = 'Approved'
  ): Observable<ApiResponseDetailIdea> {
    // Perbaiki URL sesuai dengan format yang diinginkan
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}?size=${size}&col=${column}&val=${value}`;

    console.log('Constructed URL: ', url); // Pastikan URL dibangun dengan benar

    const token = localStorage.getItem('authToken'); // Konsisten dengan nama kunci di local storage
    console.log('Retrieved Token from Local Storage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`, // Gunakan token atau string kosong jika token tidak ditemukan
    });

    return this.http
      .get<ApiResponseDetailIdea>(url, { headers })
      .pipe(catchError(this.handleError)); // Tangani error dengan baik
  }

  // Update approveIdea to accept three judges and send the request in the desired format
  approveIdea(
    id: number,
    approvalData: {
      feedback: string;
      pengujiPertama: number;
      pengujiKedua: number;
      pengujiKetiga: number;
    }
  ): Observable<any> {
    const url = `${this.apiUrl}/approve/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Retrieved Token for Approve Idea:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });

    // Modify the approvalData to match the desired format
    const body = {
      feedback: approvalData.feedback,
      pengujiPertama: approvalData.pengujiPertama,
      pengujiKedua: approvalData.pengujiKedua,
      pengujiKetiga: approvalData.pengujiKetiga,
    };

    console.log('Sending Approval Data:', body);

    return this.http
      .put<any>(url, body, { headers }) // Pass the body with the formatted data
      .pipe(catchError(this.handleError));
  }

  rejectIdea(id: number, comment: string): Observable<any> {
    const url = `${this.apiUrl}/reject/${id}`;

    const token = localStorage.getItem('authToken');
    console.log('Retrieved Token for Reject Idea:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });

    // Mengirim body dengan komentar
    const body = { comments: comment };
    console.log(body);

    return this.http
      .put<any>(url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  getDeleted(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'status',
    value: string = 'Hidden'
  ): Observable<ApiResponseDetailIdea> {
    // Perbaiki URL sesuai dengan format yang diinginkan
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}?size=${size}&col=${column}&val=${value}`;

    console.log('Constructed URL: ', url); // Pastikan URL dibangun dengan benar

    const token = localStorage.getItem('authToken'); // Konsisten dengan nama kunci di local storage
    console.log('Retrieved Token from Local Storage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`, // Gunakan token atau string kosong jika token tidak ditemukan
    });

    return this.http
      .get<ApiResponseDetailIdea>(url, { headers })
      .pipe(catchError(this.handleError)); // Tangani error dengan baik
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred: ', error);
    return throwError('Something went wrong, please try again later.');
  }
}
