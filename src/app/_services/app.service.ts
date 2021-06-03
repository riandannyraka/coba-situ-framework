import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppService extends BaseService {
  private namespace = 'app';

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getFakeData(): Observable<any> {
    return this.getApi('fake-data/datatable-data.json');
  }

  getAllDataPegawai(context): Observable<any> {
    const url = this.getUrl('dashboard', 'get_all_data_pegawai', context);
    return this.getApi(url);
  }
}
