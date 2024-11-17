import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseUser } from '../interfaces/i-api-response'; // Perbaiki impor yang benar
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
    column: string = 'id',
    value: string = ''
  ): Observable<ApiResponseUser> {
    const url = `${this.apiUrl}/${page}/${sort}/${sortBy}`;
    const params = new HttpParams()
      .set('size', size.toString())
      .set('col', column)
      .set('val', value);

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
}
