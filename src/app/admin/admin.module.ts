import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ApproveEntryComponent } from './components/approve-entry/approve-entry.component';
import { ListUserComponent } from './components/list-user/list-user.component';

// Core Module
import { CoreModule } from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDocViewerModule } from 'ngx-doc-viewer'; // Correct import from the package
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeletedDataComponent } from './components/deleted-data/deleted-data.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddUserComponent,
    ApproveEntryComponent,
    DashboardComponent,
    ListUserComponent,
    DeletedDataComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    NgbModule,
    NgxDocViewerModule, // Add the NgxDocViewerModule here
    FontAwesomeModule,
    SharedModule,
  ],
})
export class AdminModule {}
