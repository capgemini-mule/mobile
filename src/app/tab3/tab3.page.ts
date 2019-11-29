import { Component } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { TextoGeralPage } from '../configuracoes/texto-geral/texto-geral.page';
import { PerfilPage } from '../configuracoes/perfil/perfil.page';
import { AlterarSenhaPage } from '../configuracoes/alterar-senha/alterar-senha.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage, public modalController: ModalController) {
    
  }

  async logoff(){

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

            this.storage.clear().then(() => {
              console.log('logoff realizado');
              this.navCtrl.navigateRoot('/login');
            });
            
          }
        }
      ]
    });

    await alert.present();

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
