import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public navCtrl: NavController, public alertController: AlertController) {
    
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
            console.log('logoff realizado');
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();

  }

}
