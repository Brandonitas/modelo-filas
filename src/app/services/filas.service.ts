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
              case 3:
                  return Number(lambda/(s*mu)).toFixed(4);
                  break;
          }
      }
      calcularP0(lambda, mu, rho, s, k , j){
          switch(j){
              case 1:
                  return Number((1-rho)*Math.pow((rho),0)).toFixed(4);
                  break;
              case 2:
                  var sumatoria = 0;
                  for(let i = 0; i <= s-1; i++){
                      let a = Math.pow((lambda/mu),i);
                      //importar mathjs
                      let b = a/math.factorial(i);
                      sumatoria = sumatoria + b;
                  }
                  return Number((1/(sumatoria + ((Math.pow((lambda/mu),s))/math.factorial(s))*(1/(1-(lambda/(s*mu))))))).toFixed(4);
                  break;
              case 3:
                  var sumatoria = 0;
                  for(let i = 0; i <= s; i++){
                      let a = Math.pow((lambda/mu),i);
                      //importar mathjs
                      let b = a/math.factorial(i);
                      sumatoria = sumatoria + b;
                  }
                  var sumatoria2 = 0;
                  for(let i = s+1; i <= k; i++){
                      let a = Math.pow((lambda/(s*mu)),i-s);
                      //importar mathjs
                      sumatoria2 = sumatoria2 + a;
                  }
                  return Number((1/(sumatoria + ((Math.pow((lambda/mu),s))/math.factorial(s))*(sumatoria2)))).toFixed(4);
                  break;
          }
                  
      }
      calcularPN(lambda:number, mu:number, n:number, p0:number, s:number, k:number , j:number){
          switch(j){
              case 1:
                  return Number((1-(lambda/mu))*Math.pow((lambda/mu),n)).toFixed(4);
                  break;
              case 2:
                  if(n>= 0 && n < s){
                      let a = Math.pow((lambda/mu),n);
                      let b = math.factorial(n);
                      return Number((a/b)*p0).toFixed(4);
                  }else{
                      let a = Math.pow((lambda/mu),n);
                      let b = math.factorial(s)*Math.pow((s), n-s);
                      return Number((a/b)*p0).toFixed(4);
                  }
                  break;
              case 3:
                  if (n > k) {return 0;}
                  if(n>= 0 && n < s){
                      let a = Math.pow((lambda/mu),n);
                      let b = math.factorial(n);
                      return Number((a/b)*p0).toFixed(4);
                  }else if (n >= s && n <= k){
                      let a = Math.pow((lambda/mu),n);
                      let b = math.factorial(s)*Math.pow((s), n-s);
                      return Number((a/b)*p0).toFixed(4);
                  }else{
                      return 0;
                  }
                  break;
          }
      }
        calcularPNIndividualArreglo(lambda:number, mu:number, n:number, pNI:any, p0:number, s:number, k:number , j:number){
           console.log("Entre a Individual");
            switch(j){
                case 1:
                    for(let i = 1; i <= n; i++){
                        pNI.push(Number((1-(lambda/mu))*Math.pow((lambda/mu),i)).toFixed(4));
                    }
                    return pNI;
                    break;
                case 2:
                    for(let i = 1; i <= n; i++){
                        if(i>= 0 && i < s){
                            let a = Math.pow((lambda/mu),i);
                            let b = math.factorial(i);
                            pNI.push(Number((a/b)*p0).toFixed(4));
                        }else{
                            let a = Math.pow((lambda/mu),i);
                            let b = math.factorial(s)*Math.pow((s), i-s);
                            pNI.push(Number((a/b)*p0).toFixed(4));
                        }
                    }
                    return pNI;
                    break;
                case 3:
                    for(let i = 1; i <= n; i++){
                        if(i> 0 && i < s){
                            let a = Math.pow((lambda/mu),i);
                            let b = math.factorial(i);
                            pNI.push(Number((a/b)*p0).toFixed(4));
                        }else if (i >= s && i <= k){
                            let a = Math.pow((lambda/mu),i);
                            let b = math.factorial(s)*Math.pow((s), i-s);
                            pNI.push(Number((a/b)*p0).toFixed(4));
                        }else{
                            pNI.push(0);
                        }
                    }
                    return pNI;
                    break;
            }
        }

        calcularPNAcumuladaArreglo(lambda:number, mu:number, n:number, pNA:number[], pNI: number[], p0:number, s:number, k:number , j:number){
            switch(j){
                case 1:
                    for(let i = 0; i <n; i++){
                        if(i == 0){
                           pNA.push(Number(pNI[i])+Number(this.calcularP0(lambda, mu, (lambda/mu),1, 0, 1)));
                        }else if(i == n-1){
                            pNA.push(Number(this.calcularPN(lambda, mu, n, p0, 1, 0, 1))+Number(pNA[i-1]));
                        }else{
                            pNA.push(Number(pNI[i+1])+Number(pNA[i-1]));
                        }
                    }
                    return pNA;
                    break;
                case 2:
                    for(let i = 0; i <n; i++){
                        if(i == 0){
                           pNA.push(Number(pNI[i])+Number(this.calcularP0(lambda, mu, (lambda/mu),s, 0, 2)));
                        }else if(i == n-1){
                            pNA.push(Number(this.calcularPN(lambda, mu, n, p0, s, 0, 2))+Number(pNA[i-1]));
                        }else{
                            pNA.push(Number(pNI[i+1])+Number(pNA[i-1]));
                        }
                    }
                    return pNA;
                    break;
                case 3:
                    for(let i = 0; i <n; i++){
                        if(i == 0){
                           pNA.push(Number(pNI[i])+Number(this.calcularP0(lambda, mu, (lambda/mu),s, k, 3)));
                        }else if(i == n-1){
                            pNA.push(Number(this.calcularPN(lambda, mu, n, p0, s, k, 3))+Number(pNA[i-1]));
                        }else{
                            pNA.push(Number(pNI[i+1])+Number(pNA[i-1]));
                        }
                    }
                    return pNA;
                    return pNA;
                    break;
            }
        }

        calcularPNMayorArreglo(lambda:number, mu:number, n:number, pNM:number[], pNA: number[], p0:number, s:number, k:number , j:number){
            switch(j){
                case 1:
                    for(let i = 1; i <= n; i++){
                        pNM.push(1-pNA[i-1]);
                    }
                    return pNM;
                    break;
                case 2:
                    for(let i = 1; i <= n; i++){
                        pNM.push(1-pNA[i-1]);
                    }
                    return pNM;
                    break;
                case 3:
                    for(let i = 1; i <= n; i++){
                        pNM.push(1-pNA[i-1]);
                    }
                    return pNM;
                    break;
            }
        }

      calcularL(lambda:number, mu:number, p0:number, s:number, k:number, j:number){
          switch(j){
              case 1:
                  return Number((lambda)/(mu-lambda)).toFixed(4);
                  break;
              case 2: 
                  return Number(((lambda*mu*Math.pow((lambda/mu),s)*p0)/((math.factorial(s-1))*Math.pow((s*mu-lambda),2)))+(lambda/mu)).toFixed(4);
                  break;
              case 3:
                  let lambdaE = lambda *(1-(Number(this.calcularPN(lambda , mu, k, p0, s, k, 3))));
                  let a = p0*(Math.pow((lambda/mu),s))*(lambda/(s*mu));
                  let b = math.factorial(s) * (Math.pow((1-(lambda/(s*mu))),2));
                  let c = 1-(Math.pow((lambda/(mu*s)),k-s))-(k-s)*(Math.pow((lambda/(mu*s)),k-s))*(1-(lambda/(mu*s)));
                  let d = ((a/b)*c)/lambdaE;
                  let e = d + (1/mu);
                  return Number(lambdaE*e).toFixed(4);
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
              case 3:
                  let lambdaE = lambda *(1-(Number(this.calcularPN(lambda , mu, k, p0, s, k, 3))));
                  let a = p0*(Math.pow((lambda/mu),s))*(lambda/(s*mu));
                  let b = math.factorial(s) * (Math.pow((1-(lambda/(s*mu))),2));
                  let c = 1-(Math.pow((lambda/(mu*s)),k-s))-(k-s)*(Math.pow((lambda/(mu*s)),k-s))*(1-(lambda/(mu*s)));
                  return Number((a/b)*c).toFixed(4);
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
              case 3:
                  let lambdaE = lambda *(1-(Number(this.calcularPN(lambda , mu, k, p0, s, k, 3))));
                  let a = p0*(Math.pow((lambda/mu),s))*(lambda/(s*mu));
                  let b = math.factorial(s) * (Math.pow((1-(lambda/(s*mu))),2));
                  let c = 1-(Math.pow((lambda/(mu*s)),k-s))-(k-s)*(Math.pow((lambda/(mu*s)),k-s))*(1-(lambda/(mu*s)));
                  let d = ((a/b)*c)/lambdaE;
                  let e = d + (1/mu);
                  return Number(e).toFixed(4);
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
              case 3:
                  let lambdaE = lambda *(1-(Number(this.calcularPN(lambda , mu, k, p0, s, k, 3))));
                  let a = p0*(Math.pow((lambda/mu),s))*(lambda/(s*mu));
                  let b = math.factorial(s) * (Math.pow((1-(lambda/(s*mu))),2));
                  let c = 1-(Math.pow((lambda/(mu*s)),k-s))-(k-s)*(Math.pow((lambda/(mu*s)),k-s))*(1-(lambda/(mu*s)));
                  let d = ((a/b)*c)/lambdaE;
                  return Number(d).toFixed(4);
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

      

      generarRecomentaciones(lambda:number, mu:number, Cq:number, Cs:number){
        var array = [];
        var objeto1 = {

        }
        
        for(var i= 1; i< 100; i++){
          var rho = this.calcularRho(lambda, mu, i, 0, 2);
          var p0 = this.calcularP0(lambda, mu, rho, i, 0, 2);
          var Lq = this.calcularLQueue(lambda, mu, p0, i, 0, 2);
          var costoTotal = this.calcularCosto(Lq, Cq, i, Cs);

          objeto1[costoTotal] = i
          
          array.push(costoTotal);
        }
        math.sort(array);
        console.log("TODO", objeto1);
        console.log("1",objeto1[array[0]]);
        console.log("2",objeto1[array[1]]);
        console.log("3",objeto1[array[2]]);
        
        var recs = objeto1;
        return recs; 
      }

      calcularCosto(Lq, Cq, S, Cs){
        return Number(Number((Lq*Cq)+(S*Cs)).toFixed(4));
      }
    
}