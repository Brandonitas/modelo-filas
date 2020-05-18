import { Component, OnInit } from '@angular/core';
import { FilasService } from '../../../services/filas.service'
import * as math from 'mathjs';
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
  selector: 'app-mg1',
  templateUrl: './mg1.component.html',
  styleUrls: ['./mg1.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class Mg1Component implements OnInit {

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
  public sigma : any;
  public validWeibull: boolean = false;
  public validUniforme: boolean = false;
  public validBinomial: boolean = false;
  public validExpNeg: boolean = false;
  public validErklangK: boolean = false;
  public validNormal: boolean = false;
  public valorAlfa : any;
  public valorBeta : any;
  public valorA : any;
  public valorB : any;
  public valornBin : any;
  public valorpBin : any;
  public valorK : any;
  public valorSigma : any;

  public isActive = false;

  mg1 = (lambda, mu) => {
    this.rho = lambda/ mu;
    this.p0  = this.calcService.calcularP0(lambda, mu,  (lambda/mu), 1, 0, 1);
    if(this.validWeibull){
      let a = Math.pow(this.valorAlfa, 2);
      let b = math.factorial(Number(2/this.valorBeta).toFixed(0));
      let c = math.factorial(Number(1/this.valorBeta).toFixed(0));
      this.sigma = a * (b -  Math.pow(c,2));
    }
    if(this.validUniforme){
      this.sigma =  Math.pow(this.valorB - this.valorA,2)/12
    }
    if(this.validBinomial) {
      this.sigma = this.valornBin * (this.valorpBin/this.valornBin) * (1-(this.valorpBin/this.valornBin));
    }
    if(this.validExpNeg){
      this.sigma = 1/Math.pow(lambda,2);
    }
    if(this.validErklangK){
      let a = (1/Math.sqrt(this.valorK))*(1/mu);
      this.sigma = Math.pow(a,2);
    }
    if(this.validNormal){
      this.sigma = this.valorSigma;
    }
    this.lQueue = (Math.pow(lambda, 2)*this.sigma+Math.pow(this.rho,2))/(2*(1-this.rho));
    this.l = this.rho + this.lQueue;
    this.wQueue = this.lQueue/lambda;
    this.w = this.wQueue + (1/mu);
  }

  onChange($event, text){
    if(text === 'weibull'){
      if($event.checked == true){
        this.validWeibull = true;
      }else{
        this.validWeibull = false;
        this.valorAlfa  = null;
        this.valorBeta  = null;
      }
    }
    if(text === 'uniforme'){
      if($event.checked == true){
        this.validUniforme = true;
      }else{
        this.validUniforme = false;
        this.valorA = null;
        this.valorB = null;
      }
    }
    if(text === 'binomial'){
      if($event.checked == true){
        this.validBinomial = true;
      }else{
        this.validBinomial = false;
        this.valornBin = null;
        this.valorpBin = null;
      }
    }
    if(text === 'exponencialNegativa'){
      if($event.checked == true){
        this.validExpNeg = true;
      }else{
        this.validExpNeg= false;
      }
    }
    if(text === 'erklangK'){
      if($event.checked == true){
        this.validErklangK = true;
      }else{
        this.validErklangK= false;
        this.valorK = null;
      }
    }
    if(text === 'normal'){
      if($event.checked == true){
        this.validNormal = true;
      }else{
        this.validNormal= false;
        this.valorSigma = null;
      }
    }
  }

  clickButton(lambda, mu){

    //Validar que no esten vacios inputs
    this.isActive = true;

    this.mg1(Number(lambda), Number(mu));

  }

}
