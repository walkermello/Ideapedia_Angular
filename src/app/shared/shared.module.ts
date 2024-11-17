import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Menggunakan provideHttpClient()
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuNavigationComponent } from './layouts/menu-navigation/menu-navigation.component';

@NgModule({
  declarations: [MenuNavigationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [
    provideHttpClient(), // Menyediakan HttpClient
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MenuNavigationComponent,
  ],
})
export class SharedModule {}
