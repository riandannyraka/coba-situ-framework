import { CreateFdpRoutingModule } from './create-fdp-routing.module';
import { CreateFdpComponent } from './create-fdp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { NgModule } from '@angular/core';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { DataPelatihanComponent } from './pelatihan/data-pelatihan.component';
import { ShareComponent } from './share/share.component';

@NgModule({
  declarations: [CreateFdpComponent, DataPelatihanComponent, ShareComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    CreateFdpRoutingModule,
    DataTablesModule,
    ArchwizardModule, 
    SharedModule
  ]
})
export class CreateFdpModule { }
