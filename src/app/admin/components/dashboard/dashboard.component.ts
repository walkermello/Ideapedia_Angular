import { Component, OnInit } from '@angular/core';
import { IIdea } from '../../../core/interfaces/i-idea';
import { IdeaService } from '../../../core/services/idea.service';
import { FileService } from '../../../core/services/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ideas: IIdea[] = [];
  previewUrl: string | null = null;
  selectedItemId: number | null = null;
  pageNumber: number = 0;
  totalPages: number = 1;
  pageSize: number = 3;

  constructor(
    private ideaService: IdeaService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.ideaService
      .getIdeas(this.pageNumber, this.pageSize, 'asc', 'id', 'id', '')
      .subscribe({
        next: (response) => {
          this.ideas = response.content || [];
          this.totalPages = response.total_pages || 1;
        },
        error: (err) => {
          console.error('Failed to load ideas:', err);
          this.ideas = [];
          this.totalPages = 1;
        },
      });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNumber = page;
      this.loadIdeas();
    }
  }

  viewFile(itemId: number, filePath: string): void {
    this.previewUrl = 'http://localhost:9095/idea/preview/22'; // Set preview URL for ngx-doc-viewer
    this.selectedItemId = itemId; // Set selected item ID for preview
  }

  // Method untuk mendapatkan ekstensi dari nama file
  getFileExtension(fileName: string): string | null {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : null;
  }

  getIdeaImageUrl(ideaId: number): string {
    return this.fileService.getIdeaImageUrl(ideaId); // Use FileService
  }
}
