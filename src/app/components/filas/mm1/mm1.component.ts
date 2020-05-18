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
  public rho: any;
  public p0: any;
  public w: any;
  public wQueue: any;
  public l: any;
  public lQueue: any;
  public pN: any;
  public pW : any;
  public pWQueue: any;
  public pNI: any = [];
  public pNA: any = [];
  public pNM: any = [];

  public isActive = false;
  
  mm1 = (lambda, mu) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      this.rho = this.calcService.calcularRho(lambda, mu, 1, 0, 1);
      this.p0 = this.calcService.calcularP0(lambda,mu,this.rho, 1, 0, 1);
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
      this.rho = this.calcService.calcularRho(lambda, mu, 1, 0, 1);
      this.p0 = this.calcService.calcularP0(lambda,mu,this.rho, 1, 0, 1);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, 1, 0, 1);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, 1, 0, 1);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, 1, 0, 1);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, 1, 0, 1);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, 1, 0, 1);
      if(n>0){
      this.pNI = this.calcService.calcularPNIndividualArreglo(lambda, mu, n, this.pNI, this.p0, 1, 0, 1);
      this.pNA = this.calcService.calcularPNAcumuladaArreglo(lambda, mu, n, this.pNA, this.pNI, this.p0, 1, 0, 1);
      this.pNM = this.calcService.calcularPNMayorArreglo(lambda, mu, n, this.pNM, this.pNA, this.p0, 1, 0, 1);
      this.pNA = this.convert(this.pNA);
      this.pNM = this.convert(this.pNM);
      }
   
  }
  
  mm1pW = (lambda, mu, t,n) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      t = parseInt(t);
      this.rho = this.calcService.calcularRho(lambda, mu, 1, 0, 1);
      this.p0 = this.calcService.calcularP0(lambda,mu,this.rho, 1, 0, 1);
      this.l = this.calcService.calcularL(lambda, mu, this.p0, 1, 0, 1);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, 1, 0, 1);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, 1, 0, 1);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, 1, 0, 1);
      this.pW = this.calcService.calcularPW(lambda, mu, this.p0, this.rho, 1, t);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, 1, 0, 1);
      if(n>0){
      this.pNI = this.calcService.calcularPNIndividualArreglo(lambda, mu, n, this.pNI, this.p0, 1, 0, 1);
      this.pNA = this.calcService.calcularPNAcumuladaArreglo(lambda, mu, n, this.pNA, this.pNI, this.p0, 1, 0, 1);
      this.pNM = this.calcService.calcularPNMayorArreglo(lambda, mu, n, this.pNM, this.pNA, this.p0, 1, 0, 1);
      this.pNA = this.convert(this.pNA);
      this.pNM = this.convert(this.pNM);
      }
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
      this.pNI = [];
      this.pNA = [];
      this.pNM = [];
  }

  clickButton(lambda, mu, n, t){

    //Validar que no esten vacios inputs
    this.isActive = true;
    
    this.mm1(lambda, mu);
    if(n != ''){
      this.mm1n(lambda, mu, n);
      console.log("ENTRE A N")
    }
    if(t != ''){
      this.mm1pW(lambda, mu, t, n);
      console.log("ENTRE A T")
    }

    console.log(this.pNA);

  }

  convert(arr){
    let newArr =[];
    for(var i=0; i<arr.length; i++){
        newArr.push(arr[i].toFixed(4));
    }
    return newArr;
  }
}
