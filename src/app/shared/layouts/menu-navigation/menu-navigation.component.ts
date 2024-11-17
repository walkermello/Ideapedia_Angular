import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.css',
})
export class MenuNavigationComponent {
  constructor(private authService: AuthService, private router: Router) {}
  // Fungsi untuk logout
  logout() {
    this.authService.signOut(); // Menyimpan logika logout dalam auth service
    this.router.navigate(['']); // Arahkan pengguna kembali ke halaman login
  }
}
