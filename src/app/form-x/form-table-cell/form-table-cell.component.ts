import { Component, ElementRef, Input, OnInit, AfterViewInit,  Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormTableColumnComponent } from '../form-table-column/form-table-column.component';
import { FormTableRowComponent } from '../form-table-row/form-table-row.component';

@Component({
  selector: 'form-td',
  templateUrl: './form-table-cell.component.html',
  styleUrls: ['./form-table-cell.component.css']
})
export class FormTableCellComponent implements OnInit, AfterViewInit {
  @Input() key!: string;
  private row!: FormTableRowComponent;
  private column!: FormTableColumnComponent;
  private _cellInnerClass!: string;
  private _cellOuterClass!: string;

  setColumn(column: FormTableColumnComponent) {
    this.column = column;
    this.cd.detectChanges();
  }
  setRow(row: FormTableRowComponent) {
    this.row = row;
    this.cd.detectChanges();
  }
  @Input()
  get cellInnerClass(): string {
    return [this._cellInnerClass, this.row?.cellInnerClass, this.column?.cellInnerClass].filter(x=>x).join(" ");
  }
  set cellInnerClass(value: string) {
    this._cellInnerClass = value;
  }
  @Input()
  get cellOuterClass(): string {
    return [this._cellOuterClass, this.row?.cellOuterClass, this.column?.cellOuterClass].filter(x=>x).join(" ");
  }
  set cellOuterClass(value: string) {
    this._cellOuterClass = value;
  }


  constructor(private el: ElementRef, private renderer: Renderer2, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
      /* Remove the component tag */
      const parentElement = this.el.nativeElement.parentElement;
      const element = this.el.nativeElement;
      for (let c of [...element.children]) {
        this.renderer.appendChild(parentElement, c);
      }
      this.renderer.removeChild(parentElement, element);
  }

  ngOnInit(): void {
  }

}
