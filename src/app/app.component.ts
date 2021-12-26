import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medieval-dynasty-app';
  activeTab: MenuItem | null = null;
  tabMenuItems : MenuItem[] = [
    {label: "Medieval Dynasty Helper", icon: "pi pi-fw pi-home", routerLink: ['/']},
    {label: "Recipe Calculator", icon: "pi pi-fw pi-shopping-bag", routerLink: ['/recipe-calculator']},
];
  constructor(
    private primengConfig: PrimeNGConfig,
    private router : Router) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        console.log(e);
        this.activeTab = this.tabMenuItems.find((item : MenuItem) => item.routerLink.includes(e.url)) || null;
      }
    });
  }
}
