import { Component, OnInit } from '@angular/core';
import { IDetailIdea } from '../../../core/interfaces/i-detail-idea'; // Ganti sesuai dengan path yang benar
import { IUser } from '../../../core/interfaces/i-user';
import { UserService } from '../../../core/services/user.service';
import {
  ApiResponseDetailIdea,
  ApiResponseUser,
} from '../../../core/interfaces/i-api-response';
import { DetailService } from '../../../core/services/detail.service';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-deleted-data',
  templateUrl: './deleted-data.component.html',
  styleUrls: ['./deleted-data.component.css'],
})
export class DeletedDataComponent implements OnInit {
  selectedCategory: 'user' | 'idea' = 'user'; // Default untuk User
  deletedUsers: IUser[] = [];
  deletedIdeas: IDetailIdea[] = []; // Ganti tipe menjadi IDetailIdea[]
  faEllipsisH = faEllipsisH;

  constructor(
    private userService: UserService,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.showData('user'); // Memuat data user saat komponen pertama kali dimuat
  }

  // Fungsi untuk menampilkan data yang dihapus berdasarkan kategori
  showData(category: 'user' | 'idea'): void {
    this.selectedCategory = category;

    if (category === 'user') {
      // Pastikan userService.getDeleted() mengembalikan tipe ApiResponseUser
      this.userService
        .getDeleted(0, 20, 'asc', 'id', 'status', 'Deleted')
        .subscribe(
          (response: ApiResponseUser) => {
            this.deletedUsers = response.content; // Ambil data user yang dihapus
          },
          this.handleError // Menambahkan penanganan error
        );
    } else {
      // Pastikan ideaService.getDeleted() mengembalikan tipe ApiResponseDetailIdea
      this.detailService.getDeleted().subscribe(
        (response: ApiResponseDetailIdea) => {
          this.deletedIdeas = response.content; // Ambil data ide yang dihapus
        },
        this.handleError // Menambahkan penanganan error
      );
    }
  }

  // Menangani error umum di API calls
  private handleError(error: any): void {
    console.error('An error occurred:', error);
    // Bisa ditambahkan penanganan lebih lanjut (misalnya, notifikasi ke pengguna)
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId); // Use FileService
  }
}
