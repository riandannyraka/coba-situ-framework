import { BroadcasterService } from 'src/app/_services/broadcaster.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/_services/app.service';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { WizardComponent } from 'ng2-archwizard/dist';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-fdp',
  templateUrl: './create-fdp.component.html',
  styleUrls: ['./create-fdp.component.scss']
})
export class CreateFdpComponent implements OnInit {
  // Begin - Main Component of dataTable [mandatory]
  @ViewChild(DataTableDirective, { static: false }) public dtElement: DataTableDirective;
  @ViewChild(WizardComponent, { static: true }) public wizard: WizardComponent;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  // End - Main Component of dataTable [mandatory]

  public loadTable: boolean; // Create property for spinner loading

  public dataFake: Array<any>;

  // notification property
  public toastData: any;
  public id = moment().format('x')
  public url = ''

  constructor(
    public broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    public appService: AppService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.toastData = {};
    translateService.setDefaultLang(localStorage.getItem('lang'));
    broadcasterService.changeLangBroadcast$.subscribe(res => {
      translateService.setDefaultLang(res.lang);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.wizard.defaultStepIndex=1
      // this.wizard.navigation.goToStep(2)
      console.log(this.wizard)
    }, 10);
  }

  redirectWizard() {
    if (this.url) {
      if (this.url.includes('data-pelatihan')) this.wizard.navigation.goToStep(1)
      if (this.url.includes('share')) this.wizard.navigation.goToStep(2)
    }
    this.loadTable = false

  }

  goToStep2() {
    this.router.navigate(['create-fdp/data-pelatihan/' + this.id])
  }

  goToStep3() {
    this.router.navigate(['create-fdp/share/' + this.id])
  }

}
