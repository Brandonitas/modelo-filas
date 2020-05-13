import { Injectable } from '@angular/core';
import * as math from 'mathjs';


@Injectable()
export class FilasService {
  constructor() {
    console.log("Servicio listo para usarse");
   }

    calcularRho(lambda, mu, s, k, j){
        switch(j){
            case 1:
                return Number(lambda/mu).toFixed(4);
                break;
            case 2:
                return Number(lambda/(s*mu)).toFixed(4);
                break;
        }
    }

    calcularP0(lambda, mu, rho, s, k , j, sumaria){
        switch(j){
            case 1:
                return Number((rho)*Math.pow((rho),0)).toFixed(4);
                break;
            case 2:
                let sumatoria = 0;
                for(let i = 0; i <= s-1; i++){
                    let a = Math.pow((lambda/mu),i);
                    //importar mathjs
                    let b = a/math.factorial(i);
                    sumatoria = sumaria + b;
                }
                return Number((1/(sumatoria + ((Math.pow((lambda/mu),s))/math.factorial(s))*(1/(1-(lambda/(s*mu))))))).toFixed(4);
                break;
        }
                
    }
    calcularPN(lambda, mu, n, p0, s, k , j){
        switch(j){
            case 1:
                return Number((lambda/mu)*Math.pow((lambda/mu),n)).toFixed(4);
                break;
            case 2:
                break;
        }
    }
    calcularL(lambda, mu, p0, s, k , j){
        switch(j){
            case 1:
                return Number((lambda)/(mu-lambda)).toFixed(4);
                break;
            case 2: 
                return Number(((lambda*mu*Math.pow((lambda/mu),s)*p0)/((math.factorial(s-1))*Math.pow((s*mu-lambda),2)))+(lambda/mu)).toFixed(4);
                break;
        }
    }
    calcularLQueue(lambda, mu, p0, s, k , j){
        switch(j){
            case 1:
                return Number(Math.pow((lambda),2)/(mu*(mu-lambda))).toFixed(4);
                break;
            case 2: 
                return Number((Math.pow((lambda/mu),s+1)*p0)/(math.factorial(s-1)*(Math.pow((s-(lambda/mu)),2)))).toFixed(4);
                break;
        }
    }
    calcularW(lambda, mu, p0, s, k , j){
        switch(j){
            case 1:
                return Number(((lambda)/(mu-lambda))/lambda).toFixed(4);
                break;
            case 2:
                return Number((((lambda*mu*Math.pow((lambda/mu),s)*p0)/((math.factorial(s-1))*Math.pow((s*mu-lambda),2)))+(lambda/mu))/lambda).toFixed(4);
                break;
        }
    }
    calcularWQueue(lambda, mu, p0, s, k , j){
        switch(j){
            case 1:
                return Number((Math.pow((lambda),2)/(mu*(mu-lambda)))/lambda).toFixed(4);
                break;
            case 2:
                return Number(((Math.pow((lambda/mu),s+1)*p0)/(math.factorial(s-1)*(Math.pow((s-(lambda/mu)),2))))/lambda).toFixed(4);
                break;
        }
    }
    calcularPW(lambda, mu, p0, rho, s, t){
        let a = Math.exp(-1*t*mu);
        let b = 1;
        let c = Math.pow((s*rho),s)*p0*(1-(Math.exp(-mu*t*(s-1-s*rho))));
        let d = math.factorial(s)*(1-rho)*(s-1-s*rho);
        return Number((a)*((1)+(c/d))).toFixed(4);
    }
    calcularPWQueue(lambda, mu, p0, rho, s, t){
        let a = Math.exp((-s*mu*t)*(1-rho));
        let b = Math.pow((s*rho),s)*p0;
        let c = math.factorial(s)*(1-rho);
        return Number(a*(b/c)).toFixed(4);
    }

    
}