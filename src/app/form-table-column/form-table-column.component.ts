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
  private _cellInnerClass!: string;
  private _cellOuterClass!: string;

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
  @Input()
  get cellInnerClass(): string {
    return this._cellInnerClass || this.table?.cellInnerClass || "";
  }
  set cellInnerClass(value: string) {
    this._cellInnerClass = value;
  }

  @Input()
  get cellOuterClass(): string {
    return this._cellOuterClass || this.table?.cellOuterClass || "";
  }
  set cellOuterClass(value: string) {
    this._cellOuterClass = value;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
