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
  selector: 'app-mms',
  templateUrl: './mms.component.html',
  styleUrls: ['./mms.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class MmsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public calcService = new FilasService();
  public rho: any;
  public p0: any;
  public w: any;
  public wQueue: any;
  public l: any;
  public lQueue: any;
  public pN: any;
  public pW : any;
  public pWQueue: any;

  mms = (lambda, mu, s) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      s = parseInt(s);
      this.rho = this.calcService.calcularRho(lambda, mu, s, 0, 2);
      this.p0 = this.calcService.calcularP0(lambda, mu,this.rho, s, 0, 2);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, 0, 2);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, 0, 2);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, 0, 2);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, 0, 2);
  }

  mmsn = (lambda, mu, n, s) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      n = parseInt(n);
      s = parseInt(s);
      this.rho = this.calcService.calcularRho(lambda, mu, s, 0, 2);
      this.p0 = this.calcService.calcularP0(lambda, mu,this.rho, s, 0, 2);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, 0, 2);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, 0, 2);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, 0, 2);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, 0, 2);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, s, 0, 2);
  }

  mmspW = (lambda, mu, s, t, n) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      s = parseInt(s);
      t = parseInt(t);
      this.rho = this.calcService.calcularRho(lambda, mu, s, 0, 2);
      this.p0 = this.calcService.calcularP0(lambda, mu,this.rho, s, 0, 2);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, 0, 2);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, 0, 2);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, 0, 2);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, 0, 2);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, s, 0, 2);
      this.pW = this.calcService.calcularPW(lambda, mu, this.p0, this.rho, s, t);
      this.pWQueue = this.calcService.calcularPWQueue(lambda, mu, this.p0, this.rho, s, t);
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

  clickButton(lambda, mu, s, n, t){

    //Validar que no esten vacios inputs

    this.mms(lambda, mu, s);
    if(n != ''){
      this.mmsn(lambda, mu, n, s);
      console.log("ENTRE A N")
    }
    if(t != ''){
      this.mmspW(lambda, mu, s, t ,n);
      console.log("ENTRE A T")
    }

  }

}
