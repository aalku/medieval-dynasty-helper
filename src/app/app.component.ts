import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medieval-dynasty-app';
  constructor(private primengConfig: PrimeNGConfig, private itemsService: ItemsService) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log("wooden-hoe", this.itemsService.getItem("wooden-hoe"));
  }
}
