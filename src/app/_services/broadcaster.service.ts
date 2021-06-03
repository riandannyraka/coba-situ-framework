import { Injectable, EventEmitter, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BroadcasterService {
  public notifBroadcast$: EventEmitter<any>;
  public profileBroadcast$: EventEmitter<any>;
  public getMenuBroadcast$: EventEmitter<any>;
  public resetMenuBroadcast$: EventEmitter<any>;
  public changeLangBroadcast$: EventEmitter<any>;
  public hideProfileMenuBroadcast$: EventEmitter<any>;

  constructor(private injector: Injector) {
    this.notifBroadcast$ = new EventEmitter();
    this.profileBroadcast$ = new EventEmitter();
    this.getMenuBroadcast$ = new EventEmitter();
    this.resetMenuBroadcast$ = new EventEmitter();
    this.changeLangBroadcast$ = new EventEmitter();
    this.hideProfileMenuBroadcast$ = new EventEmitter();
  }

  notifBroadcast(result, data) {
    if (result) {
      this.notifBroadcast$.emit({ event: result, data });
    }
  }

  changeLangBroadcast(result, lang) {
    if (result === true) {
      this.changeLangBroadcast$.emit({ event: result, lang });
    }
  }

  profileLoaded(result) {
    if (result === true) {
      this.profileBroadcast$.emit({ event: result});
    }
  }

  getMenuBroadcast(result) {
    if (result === true) {
      this.getMenuBroadcast$.emit({ event: result});
    }
  }

  resetMenuBroadcast(result) {
    if (result === true) {
      this.resetMenuBroadcast$.emit({ event: result});
    }
  }

  hideProfileMenuBroadcast(result) {
    if (result === true) {
      this.hideProfileMenuBroadcast$.emit({ event: result});
    }
  }
}
