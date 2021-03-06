import { BroadcasterService } from 'src/app/_services/broadcaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/_services/app.service';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {
  // Begin - Main Component of dataTable [mandatory]
  @ViewChild(DataTableDirective, {static: false}) public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  // End - Main Component of dataTable [mandatory]

  public loadTable: boolean; // Create property for spinner loading

  public dataFake: Array<any>;

  // notification property
  public toastData: any;

  constructor(
    public broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    public appService: AppService
  ) {
    this.toastData = {};
    translateService.setDefaultLang(localStorage.getItem('lang'));
    broadcasterService.changeLangBroadcast$.subscribe(res => {
      translateService.setDefaultLang(res.lang);
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadTable = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        info: 'Show _START_ to _END_ from _TOTAL_ data',
        zeroRecords: 'No data found!',
        emptyTable: 'No data found!',
        lengthMenu: 'Show _MENU_ data',
        processing: 'Loading data. . . . .',
        infoFiltered: '',
        infoEmpty: ''
      },
      initComplete: () => {
          // this.loadTable = false;
      }
    };
    this.appService.getFakeData().subscribe(response => {
      setTimeout(() => { // for fake loading for 3sec [just ignore if in development mode]
        this.dataFake = response.data;
        this.dtTrigger.next(); // Trigger for load datatable
        this.broadcasterService.notifBroadcast(true, {
          title: 'Sukses',
          msg: 'Message sukses',
          timeout: 5000,
          theme: 'default',
          position: 'top-right',
          type: 'success'
        });
        this.loadTable = false;
      }, 3000);
    }, err => {
      this.broadcasterService.notifBroadcast(true, {
        title: 'Gagal',
        msg: 'Terjadi kesalahan sistem',
        timeout: 5000,
        theme: 'default',
        position: 'top-right',
        type: 'error'
      });
      this.loadTable = false;
    });
  }

}
