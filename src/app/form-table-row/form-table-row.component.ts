import { Component, ContentChildren, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormTableCellComponent } from '../form-table-cell/form-table-cell.component';
import { FormTableComponent } from '../form-table/form-table.component';

@Component({
  selector: 'form-tr',
  templateUrl: './form-table-row.component.html',
  styleUrls: ['./form-table-row.component.css']
})
export class FormTableRowComponent implements OnInit {
  private table!: FormTableComponent;
  private _cellInnerClass!: string;
  private _cellOuterClass!: string;

  setTable(table: FormTableComponent) {
    this.table = table;
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

  @ContentChildren(FormTableCellComponent) cells: FormTableCellComponent[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    /* Remove the component tag */
    const parentElement = this.el.nativeElement.parentElement;
    const element = this.el.nativeElement;
    for (let c of [...element.children]) {
      this.renderer.appendChild(parentElement, c);
    }
    this.renderer.removeChild(parentElement, element);
  }

}
