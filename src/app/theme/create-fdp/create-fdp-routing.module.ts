import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PegawaiGuard } from 'src/app/_classes/auth.guard';
import { DataPelatihanComponent } from './pelatihan/data-pelatihan.component';
import { ShareComponent } from './share/share.component';
import { CreateFdpComponent } from './create-fdp.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFdpComponent
  },
  // {
  //   path: ':url/:id',
  //   canActivate: [PegawaiGuard],
  //   component: CreateFdpComponent,
  //   data: { animation: '1' }
  // },
  {
    path: 'data-pelatihan/:id',
    canActivate: [PegawaiGuard],
    component: DataPelatihanComponent,
    data: { animation: '1' }
  },
  {
    path: 'share/:id',
    canActivate: [PegawaiGuard],
    component: ShareComponent,
    data: { animation: '1' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFdpRoutingModule { }
