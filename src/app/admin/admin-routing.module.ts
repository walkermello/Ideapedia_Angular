import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../core/services/guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ApproveEntryComponent } from './components/approve-entry/approve-entry.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [GuardService],
    children: [],
  },
  {
    path: 'list-user',
    component: ListUserComponent,
    canActivate: [GuardService],
    children: [],
  },
  {
    path: 'new-entry',
    component: ApproveEntryComponent,
    canActivate: [GuardService],
    children: [],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [GuardService],
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
