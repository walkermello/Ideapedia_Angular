import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [SigninComponent], // Exporting SigninComponent
  providers: [AuthService], // Adding AuthService to providers
})
export class AuthModule {}
