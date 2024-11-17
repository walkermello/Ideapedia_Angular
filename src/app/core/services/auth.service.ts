import { Injectable } from '@angular/core';
import { ISignin } from '../interfaces/i-signin';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/i-token';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class AuthService {
  private _token: string = ''; // Stores the token in memory
  private _bearer: string = 'Bearer';
  private _isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    // Load the token from localStorage on service initialization
    this.loadToken();
  }

  // SignIn method to log in and get the token
  signIn(signin: ISignin): Observable<IToken> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(signin);
    return this.http.post<IToken>(
      `${this.baseHttpService.baseURL}/auth/login`,
      body,
      { headers }
    );
  }

  // Getter for the token, returns "Bearer {token}"
  get token(): string {
    return `${this._bearer} ${this._token}`;
  }

  // Setter for the token, stores the token in memory and localStorage
  set token(value: string) {
    this._token = value;
    localStorage.setItem('authToken', value); // Optionally store token in localStorage
  }

  // Start a session after successful login
  sessionStart() {
    this._isLoggedIn = true;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    // Check if the token exists in memory or localStorage
    return this._isLoggedIn || !!localStorage.getItem('authToken');
  }

  // End the session when logging out
  signOut() {
    this._isLoggedIn = false;
    localStorage.removeItem('authToken'); // Remove the token on logout
  }

  // Helper to load the token from localStorage (if needed)
  loadToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this._token = token;
      this._isLoggedIn = true;
    }
  }
}
