import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponseIdea, ApiResponseUser } from '../interfaces/i-api-response'; // Perbaiki impor yang benar
import { BaseHttpService } from './base-http.service';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/user`;
  }

  getUsers(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'status',
    value: string = 'Activated'
  ): Observable<ApiResponseUser> {
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}`; // URL tanpa size, col, val di path

    const params = new HttpParams()
      .set('size', size.toString()) // Ukuran halaman
      .set('col', column) // Kolom untuk filter
      .set('val', value); // Nilai yang akan difilter (Activated)

    return this.http.get<ApiResponseUser>(url, { params });
  }

  addUser(user: any): Observable<any> {
    // Create the request body
    const requestBody = {
      username: user.username,
      nip: user.nip,
      email: user.email,
      password: user.password,
      'no-hp': user.noHp,
      unitKerja: {
        id: user.unitKerja.id, // Send only the ID
      },
    };

    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    console.log('Retrieved Token for Add User:', token);

    // Create headers with the token (if present)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`, // Bearer token for authentication
    });

    console.log('Sending User Data:', requestBody);

    // Send the POST request with the request body and headers
    return this.http.post(this.apiUrl, requestBody, { headers });
  }

  // Mendapatkan URL gambar profile user berdasarkan ID
  getUserImageUrl(userId: number): string {
    return `${this.apiUrl}/image/${userId}`;
  }

  getDeleted(
    page: number = 0,
    size: number = 3,
    sort: string = 'asc',
    sortBy: string = 'id',
    column: string = 'status',
    value: string = 'Deleted'
  ): Observable<ApiResponseUser> {
    // Perbaiki URL sesuai dengan format yang diinginkan
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}?size=${size}&col=${column}&val=${value}`;

    console.log('Constructed URL: ', url); // Pastikan URL dibangun dengan benar

    const token = localStorage.getItem('authToken'); // Konsisten dengan nama kunci di local storage
    console.log('Retrieved Token from Local Storage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`, // Gunakan token atau string kosong jika token tidak ditemukan
    });

    return this.http
      .get<ApiResponseUser>(url, { headers })
      .pipe(catchError(this.handleError)); // Tangani error dengan baik
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred: ', error);
    return throwError('Something went wrong, please try again later.');
  }

  deleteUser(userId: number) {
    const url = `${this.apiUrl}/delete/${userId}`;
    return this.http.post(url, {}); // Kirimkan request POST
  }
}
