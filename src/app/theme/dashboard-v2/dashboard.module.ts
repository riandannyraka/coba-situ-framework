import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    DashboardRoutingModule,
    DataTablesModule,
    ArchwizardModule,
    ChartModule,
    SharedModule
  ]
})
export class DashboardModule { }
