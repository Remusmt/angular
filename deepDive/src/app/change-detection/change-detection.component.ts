import { Person, people } from './../data/data';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.css']
})
export class ChangeDetectionComponent implements OnInit {

  person: Person;
  stream = new BehaviorSubject(people[1]);
  individual = this.stream.asObservable();

  currentIndex = 0;
  currentPerson: Person;
  labelText = '';

  constructor(private ngZone: NgZone) {
    this.person = people[0];
    this.currentPerson = people[0];
   }

  ngOnInit(): void {
    document.getElementById('firstName').value = this.person.Firstname;
    document.getElementById('middleName').value = this.person.Middlename;
  }

  // this doesn't trigger change detection on child component because the person object is not changed
  // I have set the component to be manually set to markForCheck if the firstname is changed
  updatePerson(): void {
    this.person.Firstname = document.getElementById('firstName').value;
    this.person.Middlename = document.getElementById('middleName').value;
  }

  // This triggers change detection on the child component
  // This is because is a components change dection strategy is set to onPush
  // it is checked on bootstrap and when binding changes
  // This person object is binded to the component through the input [person]
  changePerson(): void {
    this.person = {
      Firstname: document.getElementById('firstName').value,
      Middlename: document.getElementById('middleName').value,
      Surname: this.person.Surname,
      DateOfBirth: this.person.DateOfBirth,
      ImageUrl: this.person.ImageUrl
    };

    people[0] = this.person;
  }

  changeIndividualSublect(): void {
    const ind = {
      Firstname: document.getElementById('firstName').value,
      Middlename: document.getElementById('middleName').value,
      Surname: this.stream.value.Surname,
      DateOfBirth: this.stream.value.DateOfBirth,
      ImageUrl: this.stream.value.ImageUrl
    };
    this.stream.next(ind);

    people[1] = ind;
  }

  // NgZone
  loopPeople(doneCallBack: () => void): void {
    if (this.currentIndex < people.length) {
      this.currentPerson = people[this.currentIndex];
      window.setTimeout(() => this.loopPeople(doneCallBack), 500);
    } else {
      doneCallBack();
    }
    this.currentIndex += 1;
  }


  loopWithinAngularZone(): void {
    this.currentIndex = 0;
    this.labelText = 'Within Angular Zone';
    this.loopPeople(() => {
      this.labelText = 'Done Within Angular Zone';
    });
  }

  loopOutsideAngularZone(): void {
    this.currentIndex = 0;
    this.labelText = 'Outside of Angular Zone';
    this.ngZone.runOutsideAngular(() => {
      this.loopPeople(() => {
        this.ngZone.run(() => {
          this.labelText = 'Done Outside of Angular Zone';
        });
      });
    });
  }

}

@Component({
  selector: 'app-change-child-detection',
  template: `<p><b>{{person.Firstname + ' ' + person.Middlename}}</b></p>
  <p><b>{{indibidual.Firstname + ' ' + indibidual.Middlename}}</b></p>`,
  // <p><b>{{(individual | async).Firstname + ' ' + (individual | async).Middlename}}</b></p>`,
  // if you set strategy as onpush it is only checked when the component is bootstrap
  // and when binding has changed
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChangeDetectionChildComponent implements OnInit {

  @Input()
  person: Person;
  @Input() individual;
  indibidual: Person;
  previousFirstName = '';
  individualFirstName = '';
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.individual.subscribe(arg => {
      this.indibidual = arg;
      if (this.individualFirstName !== this.indibidual.Firstname) {
        this.individualFirstName = this.indibidual.Firstname;
        this.cdr.markForCheck();
      }
    });
  }

  ngDoCheck() {
    if (this.previousFirstName !== this.person.Firstname) {
      this.previousFirstName = this.person.Firstname;
      this.cdr.markForCheck();
    }
  }
}
