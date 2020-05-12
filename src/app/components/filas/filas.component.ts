import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-filas',
  templateUrl: './filas.component.html',
  styleUrls: ['./filas.component.scss']
})
export class FilasComponent implements OnInit {

    // Only required when not passing the id in methods
    @ViewChild('stepper', {static:false}) private myStepper: MatStepper;
    totalStepsCount: number;

  constructor() { }

  ngOnInit() {
  }

  // Event fired after view is initialized
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }

}
