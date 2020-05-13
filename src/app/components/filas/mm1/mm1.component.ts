import { Component, OnInit } from '@angular/core';
import { FilasService } from '../../../services/filas.service'
import { MatSnackBar } from "@angular/material";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-mm1',
  templateUrl: './mm1.component.html',
  styleUrls: ['./mm1.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class Mm1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public calcService = new FilasService();

    // Ubicar en ts de mm1.
  public rho: any;
  public p0: any;
  public w: any;
  public wQueue: any;
  public l: any;
  public lQueue: any;
  public pN: any;
  public pW : any;
  public pWQueue: any;
  

  mm1 = (lambda, mu) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      this.rho = this.calcService.calcularRho(lambda, mu, 1, 0, 1);
      //this.p0 = this.calcService.calcularP0(this.rho, 1, 0, 1);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, 1, 0, 1);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, 1, 0, 1);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, 1, 0, 1);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, 1, 0, 1);
  }

  mm1n = (lambda, mu, n) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      n = parseInt(n);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, 1, 0, 1);
  }

  mm1pW = (lambda, mu, t) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      t = parseInt(t);
      this.rho = this.calcService.calcularRho(lambda, mu, 1, 0, 1);
      //this.p0 = this.calcService.calcularP0(this.rho, 1, 0, 1);
      this.pW = this.calcService.calcularPW(lambda, mu, this.p0, this.rho, 1, t);
      this.pWQueue = this.calcService.calcularPWQueue(lambda, mu, this.p0, this.rho, 1, t);
  }

  cleanData(){
      this.rho = 0;
      this.p0 = 0;
      this.w = 0;
      this.wQueue = 0;
      this.l = 0;
      this.lQueue = 0;
      this.pN = 0;
      this.pW = 0;
      this.pWQueue = 0;
  }

}
