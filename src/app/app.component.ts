import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service'; // Pastikan path sesuai dengan struktur project Anda
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Update dengan 'styleUrls' bukan 'styleUrl'
})
export class AppComponent implements OnInit {
  title = 'ideapedia-new';

  constructor(private router: Router) {}

  ngOnInit() {
    // Memeriksa apakah URL saat ini adalah halaman signin
    this.router.events.subscribe(() => {
      if (this.router.url === '/signin') {
        document.body.classList.add('signin-page');
      } else {
        document.body.classList.remove('signin-page');
      }
    });
  }

  // Fungsi untuk memeriksa apakah ini halaman signin
  isSigninPage(): boolean {
    return this.router.url === '/signin';
  }

  // Fungsi untuk memeriksa status autentikasi
  isAuthenticated(): boolean {
    // Logika autentikasi Anda
    return true; // Ganti dengan logika autentikasi yang sesuai
  }
}
