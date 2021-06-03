import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DefaultConfig } from 'src/app/app-config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() NavMobCollapse = new EventEmitter();

  constructor() {
    this.nextConfig = DefaultConfig.config;
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }
}
