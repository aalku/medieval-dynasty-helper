import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { FormTableColumnComponent } from '../form-table-column/form-table-column.component';
import { FormTableRowComponent } from '../form-table-row/form-table-row.component';

@Component({
  selector: 'form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements AfterContentInit {
  @Input() headerInnerClass: string = "";
  @Input() headerOuterClass: string = "";
  @Input() cellInnerClass: string = "";
  @Input() cellOuterClass: string = "";
  @ContentChildren(FormTableColumnComponent) columns!: QueryList<FormTableColumnComponent>;
  @ContentChildren(FormTableRowComponent) rows!: QueryList<FormTableRowComponent>;
  private _indexedColumns: { [name: string]: FormTableColumnComponent } = {};

  constructor() { }

  ngAfterContentInit(): void {
    var cn = 1;
    for (let column of this.columns) {
      column.setTable(this);
      var key : string | null = column.key || column.label || "c" + cn;
      if (!column.key) {
        column.key = key;
      }
      this._indexedColumns[key] = column;
      console.log("column", key, column);
      this.columns.reset
      cn++;
    }
    var rn = 1;
    for (let row of this.rows) {
      row.setTable(this);
      console.log("row", row);
      var cn = 1;
      var named : boolean = false;
      for (let cell of row.cells) {
        named = named || (cell?.key?.length > 0);
        if (cell.key) {
          named = true;
        }
        // Once we see a name we can't use c<number> anymore
        var key : string | null = cell.key || (!named ? this.columns.get(cn - 1)?.key || null : null);
        if (key == null) {
          throw new Error(`No column key for cell ${rn}:${cn} (counting from 1:1) after a cell with a column key`);
        }
        cell.setRow(row);
        cell.setColumn(this._indexedColumns[key]);
        console.log("cell", key, cell);
        cn++;
      }
      rn++;
    }
    this.rows.changes.subscribe((value) => {
      console.log("rows changed", value);
    });
  }
}
