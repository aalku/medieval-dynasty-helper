import { AfterContentInit, Component, ContentChildren, Input } from '@angular/core';
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

  @ContentChildren(FormTableColumnComponent) columns: FormTableColumnComponent[] = [];
  @ContentChildren(FormTableRowComponent) rows: FormTableRowComponent[] = [];

  ngAfterContentInit(): void {
    for (let child of this.columns) {
      child.setTable(this);
      console.log("column",  child.headerInnerClass, "x", this.headerInnerClass);
    }
    for (let child of this.rows) {
      console.log("row", child);
    }
    // TODO prepare structure for table
  }
}
