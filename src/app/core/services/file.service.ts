import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService
  ) {
    this.apiUrl = `${this.baseHttpService.baseURL}/idea`;
  }

  // Mendapatkan URL gambar ide berdasarkan ID
  getIdeaImageUrl(ideaId: number): string {
    return `${this.apiUrl}/image/${ideaId}`;
  }

  // Mendapatkan URL preview file berdasarkan ID ide
  getFilePreviewUrl(ideaId: number): string {
    return `${this.apiUrl}/preview/${ideaId}`;
  }

  // Mendapatkan URL preview file berdasarkan ID ide
  getFilePreviewLink(ideaId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(
      `${this.apiUrl}/preview-link/${ideaId}`
    );
  }

  // Mendapatkan file sebagai blob (untuk di-download atau di-preview)
  getFile(ideaId: number) {
    return this.http.get(`${this.apiUrl}/download/${ideaId}`, {
      responseType: 'blob',
    });
  }
}
