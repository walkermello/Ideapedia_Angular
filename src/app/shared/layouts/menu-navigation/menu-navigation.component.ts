import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../core/interfaces/i-user';
import {
  faListCheck,
  faPlusCircle,
  faSignOutAlt,
  faTachometerAlt,
  faTrashAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrl: './menu-navigation.component.css',
})
export class MenuNavigationComponent implements OnInit {
  user: IUser | null = null; // Deklarasi properti user dengan tipe IUser
  // Deklarasi ikon Font Awesome
  faTachometerAlt = faTachometerAlt;
  faListCheck = faListCheck;
  faUsers = faUsers;
  faTrashAlt = faTrashAlt;
  faSignOutAlt = faSignOutAlt;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ambil data user dari AuthService
    this.authService.getUser().subscribe((user) => {
      this.user = user; // Menyimpan data user yang diterima ke properti 'user'
      console.log('User data loaded:', user); // Log data user untuk verifikasi
    });
  }

  // Fungsi untuk logout
  logout(): void {
    this.authService.signOut(); // Menyimpan logika logout dalam auth service
    this.router.navigate(['']); // Arahkan pengguna kembali ke halaman login
  }

  // Mengambil URL gambar profil berdasarkan user ID
  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId);
  }
}
