import { Component, OnInit } from '@angular/core';
import { IIdea } from '../../../core/interfaces/i-idea';
import { IdeaService } from '../../../core/services/idea.service';
import { FileService } from '../../../core/services/file.service';
import { UserService } from '../../../core/services/user.service';
import { DetailService } from '../../../core/services/detail.service';
import { IDetailIdea } from '../../../core/interfaces/i-detail-idea';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  details: IDetailIdea[] = [];
  ideas: IIdea[] = [];
  previewUrl: string | null = null;
  selectedItemId: number | null = null;
  pageNumber: number = 0;
  totalPages: number = 1;
  pageSize: number = 6;
  value: string = 'Approved';
  faEllipsisH = faEllipsisH;

  constructor(
    private detailService: DetailService,
    private fileService: FileService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.detailService
      .getApproved(
        this.pageNumber,
        this.pageSize,
        'asc', // Default sort direction
        'id', // Default sort field
        'status', // Kolom yang difilter
        this.value // Status yang ingin difilter (Approved)
      )
      .subscribe(
        (response) => {
          if (response && response.content) {
            this.details = response.content; // Pastikan response.content berisi data yang benar
            this.totalPages = response.total_pages; // Sesuaikan dengan nama field dalam response
            console.log('Loaded Ideas: ', this.details);
          } else {
            console.error('Invalid response format');
          }
        },
        (error) => {
          console.error('Error loading ideas: ', error);
        }
      );
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page;
      this.loadIdeas();
    }
  }

  // Method untuk mendapatkan ekstensi dari nama file
  getFileExtension(fileName: string): string | null {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : null;
  }

  getIdeaImageUrl(ideaId: number): string {
    return this.fileService.getIdeaImageUrl(ideaId); // Use FileService
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId); // Use FileService
  }
}
