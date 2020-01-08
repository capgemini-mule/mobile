import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor() { }

  public isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public isValidCpf(cpf) {
    if (cpf === null) return false;
    cpf = cpf.toString().trim().replace(/\D/g, '')
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
  }

  public maskCpf(v) {
    if (!v) {
      return
    }
    v = v.toString()
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Insert an dash between the third and quarter digit
    return v;
  }

  public maskCnpj(v) {
    if (!v) {
      return
    }
    v = v.toString()
    v = v.replace(/\D/g, ''); //Remove all that is not digits
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Insert a dot between the second and third digits
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Insert a dot between the fifth and sixth digits
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Insert a slash between the eighth and ninth digits
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Insert an dash after the quarter digit
    return v;
  }
}
