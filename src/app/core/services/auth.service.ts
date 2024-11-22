import { Injectable } from '@angular/core';
import { ISignin } from '../interfaces/i-signin';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IToken } from '../interfaces/i-token';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { IUser } from '../interfaces/i-user';

@Injectable()
export class AuthService {
  private _token: string = ''; // Stores the token in memory
  private _user: IUser | null = null; // Stores the user in memory
  private _bearer: string = 'Bearer';
  private _isLoggedIn: boolean = false;

  // BehaviorSubject to manage the user state
  private userSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    // Load the token and user data from localStorage on service initialization
    this.loadToken();
    this.loadUser();
  }

  // SignIn method to log in and get the token
  signIn(signin: ISignin): Observable<IToken> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(signin);
    return this.http
      .post<IToken>(`${this.baseHttpService.baseURL}/auth/login`, body, {
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Login Response:', response); // Log respons untuk memastikan apakah ada data user
          if (response.token && response.user) {
            this.handleLoginResponse(response); // Menangani respons login dan menyimpan data
          }
        })
      );
  }

  handleLoginResponse(response: IToken): void {
    // Pastikan response mengandung token dan user
    if (response.token && response.user) {
      this.token = response.token; // Set token
      this._isLoggedIn = true;

      // Menyimpan data user ke localStorage
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('userData', JSON.stringify(response.user)); // Pastikan objek user disimpan dalam bentuk JSON string

      // Update userSubject dengan data user yang baru
      this.userSubject.next(response.user);

      console.log('Login Successful, User:', response.user); // Pastikan user berhasil di-log
    }
  }

  // Getter for the token, returns "Bearer {token}"
  get token(): string {
    return `${this._bearer} ${this._token}`;
  }

  // Setter for the token, stores the token in memory and localStorage
  // Simpan token ke dalam localStorage dan set token dalam variabel _token
  set token(value: string) {
    this._token = value;
    localStorage.setItem('authToken', value); // Menyimpan token di localStorage
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

  // Setter for user data
  set user(value: IUser) {
    this._user = value;
    localStorage.setItem('userData', JSON.stringify(value)); // Store user data in localStorage
    this.userSubject.next(value); // Emit the new user data through the BehaviorSubject
  }

  // End the session when logging out
  signOut() {
    this._isLoggedIn = false;
    localStorage.removeItem('authToken'); // Remove the token on logout
    localStorage.removeItem('userData'); // Remove user data on logout
    this.userSubject.next(null); // Emit null to indicate no user is logged in
  }

  // Helper to load the token from localStorage (if needed)
  loadToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this._token = token;
      this._isLoggedIn = true;
    }
  }

  // Helper to load the user from localStorage (if needed)
  loadUser(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData) as IUser;
        this.userSubject.next(user); // Emit user data to subscribers
        console.log('Loaded user data from localStorage:', user); // Verifikasi data yang dimuat
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error); // Menangani error parsing
      }
    }
  }

  // Observable to get the current user
  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable(); // Return an observable to track user changes
  }

  // Get the current user directly
  get currentUser(): IUser | null {
    return this.userSubject.value; // Access the current user directly
  }
}
