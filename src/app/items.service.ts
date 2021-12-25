import { Injectable } from '@angular/core';
import itemsDataFile from '../assets/items.json' ;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItem(key: string): any {
    return (<any>itemsDataFile).data[key];
  }
}
