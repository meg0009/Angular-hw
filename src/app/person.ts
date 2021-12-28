export class Person {
  private _firstName: string;
  private _lastName: string;
  private _patronymic: string;
  private _dateBirth: Date;
  private _score: number;


  constructor(firstName: string, lastName: string, patronymic: string, dateBirth: Date, score: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._patronymic = patronymic;
    this._dateBirth = dateBirth;
    this._score = score;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get patronymic(): string {
    return this._patronymic;
  }

  set patronymic(value: string) {
    this._patronymic = value;
  }

  get dateBirth(): Date {
    return this._dateBirth;
  }

  set dateBirth(value: Date) {
    this._dateBirth = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  clone(): Person {
    return new Person(
      this.firstName,
      this.lastName,
      this.patronymic,
      this.dateBirth,
      this.score,
    );
  }

  partEqualsFirstName(p: Person): boolean {
    return this._firstName === p._firstName;
  }

  partEqualsLastName(p: Person): boolean {
    return this._lastName === p._lastName;
  }

  partEquals(p: Person): boolean {
    return  this.partEqualsFirstName(p) && this.partEqualsLastName(p);
  }

  equals(p: Person): boolean {
    return this.partEquals(p) && this._patronymic === p._patronymic;
  }
}
