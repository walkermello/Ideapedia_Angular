import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageFilesComponent } from './components/manage-files/manage-files.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApproveEntryComponent } from './components/approve-entry/approve-entry.component';
import { AddUserComponent } from './components/add-user/add-user.component';


@NgModule({
  declarations: [
    ManageFilesComponent,
    ListUserComponent,
    DashboardComponent,
    ApproveEntryComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
