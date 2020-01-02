import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TextoGeralPage } from '../configuracoes/texto-geral/texto-geral.page';
import { PerfilPage } from '../configuracoes/perfil/perfil.page';
import { AlterarSenhaPage } from '../configuracoes/alterar-senha/alterar-senha.page';
import { AutenticacaoService } from '../services/autenticacao.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor(public modalController: ModalController, private autenticacaoService: AutenticacaoService) {
  }

  async presentModalGeral(tipo = "") {
    const modal = await this.modalController.create({
      component: TextoGeralPage,
      componentProps: {
        'tipo': tipo
      }
    });
    return await modal.present();
  }

  async presentModalPerfil() {
    const modal = await this.modalController.create({
      component: PerfilPage
    });
    return await modal.present();
  }

  async presentModalAlterarSenha() {
    const modal = await this.modalController.create({
      component: AlterarSenhaPage
    });
    return await modal.present();
  }

  logoff() {
    this.autenticacaoService.logoff()
  }
}
