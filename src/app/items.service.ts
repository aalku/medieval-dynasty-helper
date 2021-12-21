import { Injectable } from '@angular/core';
import itemsDataFile from '../assets/items.json' ;
import { Item, ItemDataFile } from './classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItem(key: string): Item {
    return (<ItemDataFile><unknown>itemsDataFile).data[key];
  }
}
