import { Component } from '@angular/core';
import {Person} from "./person";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _persons: Person[];
  private _sorted = 0;

  dateFilter = false;
  scoreFilter = '';

  startBirth = new Date();
  endBirth = new Date();

  addPersonFlag = true;

  newPerson = new Person(
    '',
    '',
    '',
    new Date(),
    0,
  );

  foundPerson = new Person(
    '',
    '',
    '',
    new Date(),
    0,
  );

  constructor() {
    this._persons = [
      new Person(
        'Василий',
        'Тарасов',
        'Дмитриевич',
        new Date(1999, 6, 15),
        4.2),
      new Person(
        'Алексей',
        'Тарасов',
        'Дмитриевич',
        new Date(1995, 11, 16),
        4.5),
      new Person(
        'Дмитрий',
        'Захаров',
        'Сергеевич',
        new Date(1999, 7, 21),
        5.),
    ];
  }

  get persons(): Person[] {
    return this._persons;
  }

  set persons(value: Person[]) {
    this._persons = value;
  }

  addPerson(p: Person) {
    this._persons.push(p.clone());
  }

  parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  sortByFirstName() {
    this._persons.sort((a, b)=>{
      if (a.firstName > b.firstName) {
        return 1;
      } else if (a.firstName < b.firstName) {
        return -1;
      }
      return 0;
    });
    if (this._sorted === 1) {
      this._persons.reverse();
      this._sorted = -1;
    }
    this._sorted++;
  }

  sortByLastName() {
    this._persons.sort((a, b)=>{
      if (a.lastName > b.lastName) {
        return 1;
      } else if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    });
    if (this._sorted === 1) {
      this._persons.reverse();
      this._sorted = -1;
    }
    this._sorted++;
  }

  sortByPatronymic() {
    this._persons.sort((a, b)=>{
      if (a.patronymic > b.patronymic) {
        return 1;
      } else if (a.patronymic < b.patronymic) {
        return -1;
      }
      return 0;
    });
    if (this._sorted === 1) {
      this._persons.reverse();
      this._sorted = -1;
    }
    this._sorted++;
  }

  sortByDate() {
    this._persons.sort((a, b)=>{
      if (a.dateBirth > b.dateBirth) {
        return 1;
      } else if (a.dateBirth < b.dateBirth) {
        return -1;
      }
      return 0;
    });
    if (this._sorted === 1) {
      this._persons.reverse();
      this._sorted = -1;
    }
    this._sorted++;
  }

  sortByScore() {
    this._persons.sort((a, b)=>
      a.score - b.score
    );
    if (this._sorted === 1) {
      this._persons.reverse();
      this._sorted = -1;
    }
    this._sorted++;
  }

  found(inPerson: Person, foundPerson: Person): boolean {
    let first = inPerson.partEqualsFirstName(foundPerson);
    let last = inPerson.partEqualsLastName(foundPerson);
    let eq = inPerson.partEquals(foundPerson);
    if (eq) {
      return eq;
    } else if (foundPerson.firstName === '' ||
      foundPerson.lastName === '') {
      return first || last;
    }
    return false;
  }

  filter(p: Person): boolean {
    if (!this.dateFilter && this.scoreFilter === '') {
      return true;
    }
    let indexScore = this.scoreFilter.indexOf('-');
    if (!this.dateFilter) {
      return this.filterScore(indexScore, p);
    } else if (this.scoreFilter === '') {
      return this.filterDate(p);
    } else {
      return this.filterScore(indexScore, p) && this.filterDate(p);
    }
  }

  private filterScore(indexScore: number, p: Person): boolean {
    if (indexScore === -1) {
      return p.score === Number(this.scoreFilter);
    } else {
      let num = this.scoreFilter.split('-');
      return Number(num[0]) <= p.score &&
        p.score <= Number(num[1]);
    }
  }

  private filterDate(p: Person): boolean {
    let dIn = this.getDate(p.dateBirth);
    let startDate = this.getDate(this.startBirth);
    let endDate = this.getDate(this.endBirth);
    return startDate <= dIn && dIn <= endDate;
  }

  private getDate(str: string | Date): Date {
    let d: Date;
    if (!(str instanceof Date)) {
      let s = str.split('.').reverse().join('-');
      d = new Date(s);
      console.log(str, s);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    } else {
      d = new Date(str);
    }
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }

  remakePerson(p: Person) {
    for (let i = 0; i < this._persons.length; i++) {
      if (this._persons[i].equals(p)) {
        this._persons[i] = p.clone();
        return;
      }
    }
  }

  removePerson(p: Person) {
    let index = this._persons.indexOf(p);
    if (index > -1) {
      this._persons.splice(index, 1);
    }
  }
}
