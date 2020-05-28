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
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-mmsk',
  templateUrl: './mmsk.component.html',
  styleUrls: ['./mmsk.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class MmskComponent implements OnInit {

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
  public pN: any;
  public pW : any;
  public pWQueue: any;
  public pNI: any = [];
  public pNA: any = [];
  public pNM: any = [];

  public costo: number = 0;

  //Chart Options
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Pi' }
  ];

  public isActive = false;

  mmsk = (lambda, mu, s, k) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      s = parseInt(s);
      k = parseInt(k);
      this.rho = this.calcService.calcularRho(lambda, mu, s, k, 3);
      this.p0 = this.calcService.calcularP0(lambda, mu,this.rho, s, k, 3);

      //Chart P0 push
      this.barChartData[0].data.push(this.p0);
      this.barChartLabels.push("P0");

      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, k, 3);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, k, 3);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, k, 3);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, k, 3);
  }

  mmsnk = (lambda, mu, n, s, k) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      n = parseInt(n);
      s = parseInt(s);
      k = parseInt(k);
      this.rho = this.calcService.calcularRho(lambda, mu, s, k, 3);
      this.p0 = this.calcService.calcularP0(lambda, mu,this.rho, s, k, 3);

      //Chart P0 push
      this.barChartData[0].data.push(this.p0);
      this.barChartLabels.push("P0");

      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, k, 3);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, k, 3);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, k, 3);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, k, 3);
      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, s, k, 3);
      if(n>0){
        this.pNI = this.calcService.calcularPNIndividualArreglo(lambda, mu, n, this.pNI, this.p0, s, k, 3);
        this.pNA = this.calcService.calcularPNAcumuladaArreglo(lambda, mu, n, this.pNA, this.pNI, this.p0, s, k, 3);
        this.pNM = this.calcService.calcularPNMayorArreglo(lambda, mu, n, this.pNM, this.pNA, this.p0, s, k, 3);
        this.pNA = this.convert(this.pNA);
        this.pNM = this.convert(this.pNM);
      }
      
      //Chart Pn push
      for (let n = 0; n < this.pNI.length; n++) {
        this.barChartData[0].data.push(this.pNI[n]);
        var labl = "P" + (n+1);
        this.barChartLabels.push(labl);
      }
  }

  mmskpW = (lambda, mu, n,  s, k, t) =>{
      this.cleanData();
      lambda = parseFloat(lambda);
      mu = parseFloat(mu);
      s = parseInt(s);
      t = parseInt(t);
      n = parseInt(n);
      this.rho = this.calcService.calcularRho(lambda, mu, s, k, 3);
      this.p0 = this.calcService.calcularP0(lambda,mu,this.rho, s, k, 3);

      //Chart P0 push
      this.barChartData[0].data.push(this.p0);
      this.barChartLabels.push("P0");

      this.pN = this.calcService.calcularPN(lambda, mu, n, this.p0, s, k, 3);

      this.l = this.calcService.calcularL(lambda, mu, this.p0, s, k, 3);
      this.lQueue = this.calcService.calcularLQueue(lambda, mu, this.p0, s, k, 3);
      this.w = this.calcService.calcularW(lambda, mu, this.p0, s, k, 3);
      this.wQueue = this.calcService.calcularWQueue(lambda, mu, this.p0, s, k, 3);

      if(n>0){
        this.pNI = this.calcService.calcularPNIndividualArreglo(lambda, mu, n, this.pNI, this.p0, s, k, 3);
        this.pNA = this.calcService.calcularPNAcumuladaArreglo(lambda, mu, n, this.pNA, this.pNI, this.p0, s, k, 3);
        this.pNM = this.calcService.calcularPNMayorArreglo(lambda, mu, n, this.pNM, this.pNA, this.p0, s, k, 3);
        this.pNA = this.convert(this.pNA);
        this.pNM = this.convert(this.pNM);
      }
      this.pW = this.calcService.calcularPW(lambda, mu, this.p0, this.rho, s, t);
      this.pWQueue = this.calcService.calcularPWQueue(lambda, mu, this.p0, this.rho, s, t);

      //Chart Pn push
      for (let n = 0; n < this.pNI.length; n++) {
        this.barChartData[0].data.push(this.pNI[n]);
        var labl = "P" + (n+1);
        this.barChartLabels.push(labl);
      }
  }

  calcCosto(lambda, mu, s, k, Cq,Cs){
    var lQueueNueva = this.calcService.calcularLQueue(lambda, mu, this.p0, s, k, 3);
    this.costo = this.calcService.calcularCosto(this.lQueue, Cq, s, Cs);
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
    this.barChartData[0].data = [];
    this.barChartLabels = [];
  }

  clickButton(lambda, mu, s, k, n, t, Cq, Cs){

     
    if(!this.isValid(lambda, mu, s, k)){
      return;
    }

    this.openSuccessDialog();

    //Validar que no esten vacios inputs
    this.isActive = true;

    this.mmsk(lambda, mu, s, k);

    if(n != ''){
      this.mmsnk(lambda, mu, n, s, k);
      console.log("ENTRE A N")
    }
    if(t != ''){
      this.mmskpW(lambda, mu, n,  s, k ,t);
      console.log("ENTRE A T")
    }


    if(Cq != '' && Cs != ''){
      this.calcCosto(lambda, mu, s, k, Cq,Cs);
    }

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


  isValid(lambda, mu, s, k){
    //Validamos que no vengan vacías 
  
    console.log("")
    if (lambda === '' || mu === '' || s==='' || k==='') {
      this.openErrorDialog('Los datos no deben estar vacíos')
      return false;
    }
  
    return true;
    
  }


  }
