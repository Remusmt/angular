import { people, Person } from './../data/data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  people = people;
  constructor() { }

  ngOnInit(): void {
  }

}
