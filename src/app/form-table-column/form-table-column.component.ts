import { Component, Input, OnInit } from '@angular/core';
import { FormTableComponent } from '../form-table/form-table.component';

@Component({
  selector: 'form-tc',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.css']
})
export class FormTableColumnComponent implements OnInit {
  table!: FormTableComponent;

  setTable(table: FormTableComponent) {
    this.table = table;
  }

  @Input() key!: string;
  @Input() label!: string;

  private _headerInnerClass!: string;
  private _headerOuterClass!: string;

  @Input()
  get headerInnerClass(): string {
    return this._headerInnerClass || this.table?.headerInnerClass || "";
  }
  set headerInnerClass(value: string) {
    this._headerInnerClass = value;
  }

  @Input()
  get headerOuterClass(): string {
    return this._headerOuterClass || this.table?.headerOuterClass || "";
  }
  set headerOuterClass(value: string) {
    this._headerOuterClass = value;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
