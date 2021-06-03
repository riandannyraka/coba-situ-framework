import { SamplePageRoutingModule } from './sample-page-routing.module';
import { SamplePageComponent } from './sample-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SamplePageComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    SamplePageRoutingModule,
    DataTablesModule,
    SharedModule
  ]
})
export class SamplePageModule { }
