import { BroadcasterService } from 'src/app/_services/broadcaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/_services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Begin - Main Component of dataTable [mandatory]
  @ViewChild(DataTableDirective, { static: false }) public dtElement: DataTableDirective;
  @ViewChild('modalTambah', { static: true }) public modalTambah: any;
  @ViewChild('modalEditView', { static: true }) public modalEditView: any;
  public dtOptions: any;
  public dtTrigger = new Subject();
  // End - Main Component of dataTable [mandatory]

  public loadTable = false; // Create property for spinner loading
  public loadingForm = false

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
  public selectedTipeForm = ''
  public selectedStartDate = ''
  public formType = ''
  public url = null

  public formDataPegawai: FormGroup

  // notification property
  public toastData: any;
  public rawData: any

  constructor(
    public broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    public appService: AppService,
    private fb: FormBuilder
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
    this.formDataPegawai = this.fb.group({
      empName: new FormControl(''),
      empPosition: new FormControl(''),
      type: new FormControl(''),
      startDate: new FormControl(''),
      url: new FormControl(''),
    })
  }

  ngOnInit() {
    this.getAllData();
  }

  openFormTambah() {
    this.selectedTipeForm = ''
    this.formDataPegawai.reset()
    this.modalTambah.show()
    // this.modalTambah.hide()
  }

  openFormEditView(data, type) {
    this.formType = type
    this.selectedTipeForm = ''
    this.formDataPegawai.reset()
    let { delegatefullname, delegatepositionname, delegationtypeid, startdate } = data
    this.rawData = data
    this.selectedTipeForm = delegationtypeid && delegationtypeid.toString()
    this.formDataPegawai.patchValue({
      empName: delegatefullname,
      empPosition: delegatepositionname,
      startDate: startdate ? moment(startdate).format('YYYY-MM-DD') : 'NONE',
    })
    this.modalEditView.show()
  }

  saveEditData() {
    this.loadingForm = true
    let { delegationhistoryid } = this.rawData
    let { empName, empPosition, startDate } = this.formDataPegawai.value
    let index = this.types.findIndex(e => e.value === this.selectedTipeForm)
    // let payload = {
    //   delegatefullname: empName,
    //   delegatepositionname: empPosition,
    //   delegationabbreviation: index >= 0 ? this.types[index].label : 'NONE',
    //   startdate: startDate ? moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY') : 'NONE'
    // }
    setTimeout(() => {
      let indexData = this.dataFake.findIndex(e => e.delegationhistoryid === delegationhistoryid)
      this.dataFake[indexData] = {
        ...this.dataFake[indexData],
        delegatefullname: empName,
        delegatepositionname: empPosition,
        delegationabbreviation: index >= 0 ? this.types[index].label : 'NONE',
        startdate: startDate ? moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY') : 'NONE'
      }
      this.modalEditView.hide()
      this.loadingForm = false
      // this.appService.postData(payload).subscribe(response => {})
      // this.dataFake.push(payload)
    }, 3000);
  }

  openDoc() {
    let { reportingdocument } = this.rawData
    if (reportingdocument) window.open(reportingdocument)
    else alert('DOKUMEN TIDAK DITEMUKAN')
  }

  onUploadFile(e) {
    let tempUrl = e.target.files[0]
    console.log(tempUrl)
    if (tempUrl.size > 1000000) { this.formDataPegawai.patchValue({ url: '' }); return alert('UKURAN TIDAK DAPAT LEBIH DARI 1MB') }
    if (!tempUrl.type.includes('pdf')) { this.formDataPegawai.patchValue({ url: '' }); return alert('FORMAT HARUS PDF') }
    this.url = tempUrl
    this.formDataPegawai.patchValue({ url: tempUrl.name })
  }

  saveData() {
    this.loadingForm = true
    let { empName, empPosition, startDate } = this.formDataPegawai.value
    let index = this.types.findIndex(e => e.value === this.selectedTipeForm)
    let payload = {
      delegatefullname: empName,
      delegatepositionname: empPosition,
      delegationabbreviation: index >= 0 ? this.types[index].label : 'NONE',
      startdate: startDate ? moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY') : 'NONE'
    }
    console.log(payload)
    setTimeout(() => {
      this.modalTambah.hide()
      this.loadingForm = false
      this.dataFake.push(payload)
    }, 3000);

  }

  getAllData() {
    if (this.dataFake.length > 0) this.render()
    this.dataFake = []
    this.loadTable = true
    let params = 0
    this.appService.getAllDataPegawai(params).subscribe(response => {
      this.dataFake = response.data.splice(1, 10);
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
      this.dataFake = response.data.splice(1, 10);;
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
