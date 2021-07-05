import { OauthService } from 'src/app/_services/oauth.service';
import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const Admin = {
  id: 3,
  title: 'Admin',
  type: 'item',
  url: '/berita-acara',
  classes: 'nav-item',
  icon: 'icofont icofont-paper'
};

const Dashboard = {
  id: 'menu-dashboard',
  title: 'Dashboard',
  type: 'item',
  url: '/dashboard-v2',
  classes: 'nav-item',
  icon: 'icofont icofont-paper'
}

const Approval = {
  id: 4,
  title: 'Approval',
  type: 'item',
  url: '/berita-acara-approval',
  classes: 'nav-item',
  icon: 'icofont icofont-law-document'
};

const FDP = {
  id: 3,
  title: 'TESTING ARCH WIZARD',
  type: 'item',
  url: '/create-fdp',
  classes: 'nav-item',
  icon: 'icofont icofont-law-document',
  children: [
    {
      id: '3-1',
      title: 'TESTING ARCH WIZARD',
      type: 'item',
      hidden: true,
      url: '/create-fdp/data-pelatihan/:id',
      classes: 'nav-item',
      icon: 'icofont icofont-law-document',
    },
    {
      id: '3-2',
      title: 'TESTING ARCH WIZARD',
      type: 'item',
      hidden: true,
      url: '/create-fdp/share/:id',
      classes: 'nav-item',
      icon: 'icofont icofont-law-document',
    }
  ]
}

const NavigationItems = [
  {
    id: 0,
    title: 'Menu',
    type: 'group',
    icon: 'ti-home',
    children: [
    ]
  }
];

@Injectable()
export class NavigationItem {
  public items = [];
  constructor(
    private oauthService: OauthService
  ) { }

  public addOrReplace(item) {
    if (this.items.indexOf(item) === -1) {
      this.items.push(item);
      NavigationItems[0]['children'].push(item);
    }
  }

  public get() {
    if (this.oauthService.checkScope('old-admin-sdm')) {
      this.addOrReplace(Admin);
    }

    if (this.oauthService.checkScope('old-pegawai')) {
      this.addOrReplace(Dashboard);
    }
    this.addOrReplace(FDP);
    return NavigationItems;
  }
}
