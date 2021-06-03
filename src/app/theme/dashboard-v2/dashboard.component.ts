import { BroadcasterService } from 'src/app/_services/broadcaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Begin - Main Component of dataTable [mandatory]
  @ViewChild(DataTableDirective, { static: false }) public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  // End - Main Component of dataTable [mandatory]

  public loadTable = false; // Create property for spinner loading

  public dataFake = [];
  public dataDummy = []
  public types = [
    {
      value: '1',
      label: 'POH'
    },
    {
      value: '2',
      label: 'PGS'
    }
  ]

  public selectedTipe = ''
  public selectedStartDate = ''

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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      destroy: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'print',
          exportOptions: {
            title: 'TEST',
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: 'excel',
          exportOptions: {
            title: 'TEST',
            columns: [0, 1, 2, 3, 4, 5, 6]
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets['sheet1.xml'];
            $('row[r!=1][r!=2] c', sheet).attr('s', '50');
          }
        },
        {
          extend: 'csv',
          exportOptions: {
            title: 'TEST',
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        }
      ],
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
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    if (this.dataFake.length > 0) this.render()
    this.dataFake = []
    this.loadTable = true
    let params = 0
    this.appService.getAllDataPegawai(params).subscribe(response => {
      this.dataFake = response.data;
      this.dtTrigger.next()
      this.loadTable = false
    }, err => {
      this.dtTrigger.next()
      this.loadTable = false
    })
  }

  getDataByFilter() {
    if (this.dataFake.length > 0) this.render()
    this.dataFake = []
    this.loadTable = true
    let tipe = this.selectedTipe ? this.selectedTipe : 0
    let date = this.selectedStartDate ? this.selectedStartDate : 0
    let params = `0/${tipe}/${date}`
    this.appService.getAllDataPegawai(params).subscribe(response => {
      this.dataFake = response.data;
      this.dtTrigger.next()
      this.loadTable = false
    }, err => {
      this.dtTrigger.next()
      this.loadTable = false
    })
  }
  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
}
