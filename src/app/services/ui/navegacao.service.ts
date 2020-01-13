import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Orgao } from 'src/app/types/Orgao';

@Injectable({
  providedIn: 'root'
})
export class NavegacaoService {

  private orgao: Orgao = null;

  constructor(private navCtrl: NavController) { }

  public getOrgao() : Orgao {
    return this.orgao;
  }

  public goToService(item: any) {
    console.log('goToService', item);

    // TODO validar permissão ao service

    if (item.id == "1") { // lista de tipos de documentos
      this.navCtrl.navigateForward('/lista-tipo-identificacao');
    } else if (item.id == "2") { // lista de tipos de documentos
      this.navCtrl.navigateForward('/lista-orgaos');
    } else {
      this.navCtrl.navigateForward('/inscricao-matricula');
    }
  }

  public goToOrgao(orgao: Orgao = null) {
    this.orgao = orgao;
    this.navCtrl.navigateForward('/form-orgao');
  }
}
