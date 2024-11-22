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
  overlayVisible: boolean[] = [];
  previewUrl: string | null = null;
  filteredDetails: IDetailIdea[] = [];
  searchQuery: string = ''; // Variable for search query
  selectedItemId: number | null = null;
  pageNumber: number = 0;
  totalPages: number = 0;
  searchValue = ''; // Search query
  selectedColumn = 'judul'; // Selected column for search
  selectedSort = 'asc'; // Sorting order (asc/desc)
  selectedSortBy = 'id'; // Sort by field
  pageSize: number = 6;
  value: string = 'Approved';
  faEllipsisH = faEllipsisH;

  constructor(
    private detailService: DetailService,
    private fileService: FileService,
    private userService: UserService,
    private ideaService: IdeaService
  ) {}

  ngOnInit(): void {
    this.loadIdeas();
    // Inisialisasi array overlayVisible
    if (this.details && Array.isArray(this.details)) {
      this.overlayVisible = new Array(this.details.length).fill(false);
    }
  }

  loadIdeas(): void {
    this.detailService
      .getApproved(
        this.pageNumber,
        this.pageSize,
        this.selectedSort,
        this.selectedSortBy,
        'status', // Kolom yang difilter
        this.value // Status yang ingin difilter (Approved)
      )
      .subscribe(
        (response) => {
          if (response && response.content) {
            this.details = response.content; // Pastikan response.content berisi data yang benar
            this.totalPages = response.total_pages; // Sesuaikan dengan nama field dalam response

            // Perbarui overlayVisible berdasarkan jumlah item dalam details
            this.overlayVisible = new Array(this.details.length).fill(false);
            this.filteredDetails = [...this.details]; // Initialize filteredDetails
            console.log('Loaded Ideas: ', this.details);
            console.log('OverlayVisible: ', this.overlayVisible);
          } else {
            console.error('Invalid response format');
          }
        },
        (error) => {
          console.error('Error loading ideas: ', error);
        }
      );
  }

  toggleOverlay(index: number): void {
    // Toggle visibilitas overlay
    this.overlayVisible = this.overlayVisible.map((v, i) =>
      i === index ? !v : false
    );
    console.log('Test Toggle');
  }

  hideIdea(ideaId: number): void {
    this.ideaService.hideIdea(ideaId).subscribe(
      (response) => {
        console.log('Idea hidden successfully:', response);

        // Perbarui data frontend
        this.details = this.details.filter((item) => item.idea.id !== ideaId);
        this.overlayVisible = new Array(this.details.length).fill(false); // Reset overlayVisible

        // Refresh halaman setelah ide disembunyikan
        window.location.reload(); // Ini akan merefresh halaman
      },
      (error) => {
        console.error('Failed to hide idea:', error);
      }
    );
  }

  onSearch(): void {
    // Filter details based on search query
    if (this.searchQuery.trim()) {
      this.filteredDetails = this.details.filter(
        (item) =>
          item.idea.judul
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.idea.deskripsi
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDetails = [...this.details]; // Reset to all items if search is empty
    }
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page;
      this.loadIdeas();
    }
  }

  getIdeaImageUrl(ideaId: number): string {
    return this.fileService.getIdeaImageUrl(ideaId); // Use FileService
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId); // Use FileService
  }
}
