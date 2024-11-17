import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MenuNavigationComponent } from './layouts/menu-navigation/menu-navigation.component';


@NgModule({
  declarations: [
    MenuNavigationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
