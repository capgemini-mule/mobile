import { Component } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { TextoGeralPage } from '../configuracoes/texto-geral/texto-geral.page';
import { PerfilPage } from '../configuracoes/perfil/perfil.page';
import { AlterarSenhaPage } from '../configuracoes/alterar-senha/alterar-senha.page';
import { AutenticacaoService } from '../services/autenticacao.service'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  loading: any;

  constructor(public navCtrl: NavController, public alertController: AlertController, 
    private storage: Storage, public modalController: ModalController,
    public loadingController: LoadingController, public AutenticacaoService: AutenticacaoService) {
  }

  async logoff() {
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelando logoff');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.presentLoading("Saindo...");
            this.AutenticacaoService.post("http://autorizacao-cogel-proxy.br-s1.cloudhub.io/logout").subscribe( result => {
              this.clearTokenAndLeave()
            }, err =>{
              console.log("Erro na requisição: ", err);
              this.clearTokenAndLeave()    
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();    
  }

  clearTokenAndLeave() {
    this.storage.set('access_token', null).then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.navigateRoot('/login');
       });
    });
  }

  async presentModalGeral(tipo = "") {
    console.log("presentModalGeral")
    const modal = await this.modalController.create({
      component: TextoGeralPage,
      componentProps: {
        'tipo': tipo
      }
    });
    return await modal.present();
  }

  async presentModalPerfil() {
    console.log("presentModalPerfil")
    const modal = await this.modalController.create({
      component: PerfilPage
    });
    return await modal.present();
  }

  async presentModalAlterarSenha() {
    console.log("presentModalAlterarSenha")
    const modal = await this.modalController.create({
      component: AlterarSenhaPage
    });
    return await modal.present();
  }
  
}
