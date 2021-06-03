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
    DataTablesModule,
    SharedModule
  ]
})
export class DashboardModule { }
