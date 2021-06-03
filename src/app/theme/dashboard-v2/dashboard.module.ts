import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    DashboardRoutingModule,
    DataTablesModule,
    SharedModule
  ]
})
export class DashboardModule { }
