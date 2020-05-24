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

  constructor(public snackBarSuccess: MatSnackBar,
    public snackBarError: MatSnackBar) { }

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
  public validUniforme: boolean = false;
  public validBinomial: boolean = false;
  public validExpNeg: boolean = false;
  public validErklangK: boolean = false;
  public validNormal: boolean = false;
  public validD: boolean = false;
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
    this.rho = lambda/mu;
    this.p0  = this.calcService.calcularP0(lambda, mu,  (lambda/mu), 1, 0, 1);
    if(this.validUniforme){
      this.sigma =  Math.pow(this.valorB - this.valorA,2)/12
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
    if(this.validD){
      this.sigma = 0;
    }
    this.lQueue = (Math.pow(lambda, 2)*this.sigma+Math.pow(this.rho,2))/(2*(1-this.rho));
    this.l = this.rho + this.lQueue;
    this.wQueue = this.lQueue/lambda;
    this.w = this.wQueue + (1/mu);

    //this.rho = this.rho.substring(0,5);
    this.rho = (this.rho).toFixed(4);
    this.p0 = Number(this.p0).toFixed(4);
    this.lQueue = (this.lQueue).toFixed(4);
    this.l = (this.l).toFixed(4);
    this.wQueue = (this.wQueue).toFixed(4);
    this.w = (this.w).toFixed(4);

    console.log("SIGMA", this.sigma);


  }

  onChange($event, text){
    if(text === 'uniforme'){
      if($event.checked == true){
        this.validUniforme = true;

        this.validD = false;
        this.validBinomial = false;
        this.validExpNeg = false;
        this.validErklangK = false;
        this.validNormal = false;

      }else{
        this.validUniforme = false;
        this.valorA = null;
        this.valorB = null;
      }
    }
    if(text === 'exponencialNegativa'){
      if($event.checked == true){
        this.validExpNeg = true;

        this.validD = false;
        this.validUniforme = false;
        this.validBinomial = false;
        this.validErklangK = false;
        this.validNormal = false;
      }else{
        this.validExpNeg= false;
      }
    }
    if(text === 'erklangK'){
      if($event.checked == true){
        this.validErklangK = true;

        this.validD = false;
        this.validUniforme = false;
        this.validBinomial = false;
        this.validExpNeg = false;
        this.validNormal = false;
      }else{
        this.validErklangK= false;
        this.valorK = null;
      }
    }
    if(text === 'normal'){
      if($event.checked == true){
        this.validNormal = true;

        this.validD = false;
        this.validUniforme = false;
        this.validBinomial = false;
        this.validExpNeg = false;
        this.validErklangK = false;
      }else{
        this.validNormal= false;
        this.valorSigma = null;
      }
    }
    if(text === 'dConstante'){
      if($event.checked == true){
        this.validD = true;

        this.validNormal = false;
        this.validUniforme = false;
        this.validBinomial = false;
        this.validExpNeg = false;
        this.validErklangK = false;
      }else{
        this.validD= false;
      }
    }
  }

  clickButton(lambda, mu){

    //Validar que no esten vacios inputs
    if(!this.isValid(lambda, mu)){
      return;
    }

    this.openSuccessDialog();

    this.isActive = true;

    this.mg1(Number(lambda), Number(mu));

  }

  convert(arr){
    let newArr =[];
    for(var i=0; i<arr.length; i++){
        newArr.push(arr[i].toFixed(4));
    }
    return newArr;
  }

  openErrorDialog(error){
    this.snackBarError.open("Error: "+ error, "", {
      duration: 6000,
      panelClass: 'error-snackbar'
    });
  }
  
  openSuccessDialog(){
    this.snackBarSuccess.open("Simulación generada con éxito", "", {
      duration: 3000,
      panelClass: 'success-snackbar',
      verticalPosition: 'top'
    });
  }

  isValid(lambda, mu){
    //Validamos que no vengan vacías 
  
    console.log("")
    if (lambda === '' || mu === '' ) {
      this.openErrorDialog('Los datos no deben estar vacíos')
      return false;
    }
  
    return true;
    
  }

 

}
