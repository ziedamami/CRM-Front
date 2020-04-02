import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/soon_d', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
  { path: '/sale', title: 'Nouvelle expédition',  icon:'flight_takeoff', class: '' },
  { path: '/mysales', title: 'Mes expéditions',  icon:'sync_alt', class: '' },
  { path: '/soon', title: 'Mes factures',  icon:'euro_symbol', class: '' },


];

@Component({
  selector: 'app-sellersidebar',
  templateUrl: './sellersidebar.component.html',
  styleUrls: ['./sellersidebar.component.scss']
})
export class SellersidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
