import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentService extends BaseService {
  private namespace = 'app';

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getAllDokumen(context): Observable<any> {
    const url = this.getUrl('dokumen', 'get_document', context);
    return this.getApi(url);
  }

  postDocument(body): Observable<any> {
    const url = this.getUrl('dokumen', 'create_document');
    return this.postApiPlain(url, body);
  }

  updateDocument(body): Observable<any> {
    const url = this.getUrl('dokumen', 'update_document');
    return this.postApiPlain(url, body);
  }

}
