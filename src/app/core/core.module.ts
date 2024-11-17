import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BaseHttpService } from './services/base-http.service';
import { GuardService } from './services/guard.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [BaseHttpService, GuardService, AuthService],
})
export class CoreModule {}
