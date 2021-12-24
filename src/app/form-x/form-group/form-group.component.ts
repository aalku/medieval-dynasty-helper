import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {
  @Input() title: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }


}
