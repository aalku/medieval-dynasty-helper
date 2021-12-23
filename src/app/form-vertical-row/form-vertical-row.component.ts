import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-vr',
  templateUrl: './form-vertical-row.component.html',
  styleUrls: ['./form-vertical-row.component.css']
})
export class FormVerticalRowComponent implements OnInit {
  @Input() label: string | undefined;
  @Input() valueContainerClass: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
