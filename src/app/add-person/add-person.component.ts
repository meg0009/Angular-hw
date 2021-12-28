import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../person";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  @Input()
  newPerson = new Person(
    '',
    '',
    '',
    new Date(),
    0,
  );

  @Output()
  addSubmit = new EventEmitter<Person>();

  constructor() { }

  ngOnInit(): void {
  }

  parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

}
