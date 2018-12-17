import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';

import { ToolListComponent } from 'app/tools/tool-list/tool-list.component';
import { LocationListComponent } from 'app/locations/location-list/location-list.component';
import { AddToolDialogComponent } from 'app/tools/add-tool-dialog/add-tool-dialog.component';
import { ChangeLocationDialogComponent } from 'app/tools/change-location-dialog/change-location-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ToolListComponent,
    LocationListComponent,
    AddToolDialogComponent,
    ChangeLocationDialogComponent
  ],
  entryComponents: [
    AddToolDialogComponent,
    ChangeLocationDialogComponent
  ]
})

export class AdminLayoutModule {}