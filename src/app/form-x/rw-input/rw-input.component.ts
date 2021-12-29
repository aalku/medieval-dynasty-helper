import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rw-input',
  templateUrl: './rw-input.component.html',
  styleUrls: ['./rw-input.component.css']
})
export class RwInputComponent implements OnInit {
  private editedClass: string = 'rw-input-edited';
  private _editedValue: string = "";
  private _defaultValue: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  get editedValue(): string {
    return this._editedValue;
  }
  set editedValue(value: string) {
    this._editedValue = value;
    this.editedValueChange.emit(this._editedValue);
  }

  onInput(event: any): void {
    this.editedValueChange.emit(this._editedValue);
  }

  @Output()
  editedValueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get defaultValue(): string {
    return this._defaultValue;
  }
  set defaultValue(value: string) {
    this._defaultValue = value;
  }

  get editedOrNotClass(): string {
    return this.edited ? this.editedClass : '';
  }
  @Output()
  get edited(): boolean {
    return (this.editedValue?.trim()?.length || 0) != 0;
  }

}
