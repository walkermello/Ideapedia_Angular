import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ApiResponseUser } from '../../../core/interfaces/i-api-response';
import { IUser } from '../../../core/interfaces/i-user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  pageNumber: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;
  searchQuery = '';
  sortOrder = { username: 'desc', nip: 'desc' };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.nip.includes(query)
      );
    } else {
      this.filteredUsers = [...this.users]; // Show all users if search query is empty
    }
    this.updatePagination(); // Update pagination after search
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page; // Update pageNumber
      this.loadUsers(); // Reload data from API
    }
  }

  updatePagination(): void {
    // Pastikan totalPages dihitung berdasarkan total_pages dari API
    this.totalPages = this.totalPages || 0; // Tetap gunakan nilai dari server
  }

  sortTable(column: string): void {
    if (column !== 'username' && column !== 'nip') {
      return;
    }

    const order = this.sortOrder[column] === 'desc' ? 'asc' : 'desc';
    this.sortOrder[column] = order;

    this.filteredUsers.sort((a, b) => {
      const valueA = column === 'nip' ? a[column] : a[column].toLowerCase();
      const valueB = column === 'nip' ? b[column] : b[column].toLowerCase();

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  loadUsers(): void {
    console.log('Loading users for page:', this.pageNumber); // Debug
    this.userService
      .getUsers(
        this.pageNumber,
        this.pageSize,
        'asc', // Sort order
        'id', // Sort field
        this.searchQuery
      )
      .subscribe(
        (response: ApiResponseUser) => {
          console.log('Received data:', response.content);
          console.log('Total Pages:', response.total_pages);

          if (response.content) {
            this.users = response.content;
            this.filteredUsers = [...this.users];
            this.totalPages = response.total_pages;
          }
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
}
