import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Impor Router untuk navigasi
import { UserService } from '../../../core/services/user.service';
import { ApiResponseUser } from '../../../core/interfaces/i-api-response'; // Import yang benar
import { IUser } from '../../../core/interfaces/i-user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'], // Perbaikan penulisan styleUrls
})
export class ListUserComponent implements OnInit {
  users: IUser[] = [];
  pageNumber: number = 0;
  totalPages: number = 1;
  pageSize: number = 3; // Mengatur pageSize menjadi 3 item per halaman

  constructor(
    private userService: UserService,
    private router: Router // Menambahkan Router untuk navigasi
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getUsers(this.pageNumber, this.pageSize, 'asc', 'id', 'id', '')
      .subscribe((response) => {
        this.users = response.content;
        this.totalPages = response.total_pages;
      });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadUsers();
  }

  // Fungsi untuk redirect ke halaman Add User
  addUser(): void {
    this.router.navigate(['add-user']); // Pastikan route ini sesuai dengan routing Anda
  }
}
