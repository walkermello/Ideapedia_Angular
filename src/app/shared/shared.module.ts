import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Menggunakan provideHttpClient()
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuNavigationComponent } from './layouts/menu-navigation/menu-navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrlPipe } from '../core/pipes/safe-url';

@NgModule({
  declarations: [MenuNavigationComponent, SafeUrlPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [
    provideHttpClient(), // Menyediakan HttpClient
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MenuNavigationComponent,
    SafeUrlPipe,
  ],
})
export class SharedModule {}
