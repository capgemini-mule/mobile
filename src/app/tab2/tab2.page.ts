import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  not_found: any = false;
  loading: any;

  lista_servicos: any = [];

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage, public AutenticacaoService: AutenticacaoService, public loadingController: LoadingController) {
    
  }

  ngAfterViewInit() {
    this.getFavoritesServices()
  }

  getFavoritesServices() {
    this.storage.get('servicos_favoritos').then((favoritesString) => {
      let favorites = JSON.parse(favoritesString)
      if (favorites !== null && favorites.length > 0) {
        this.lista_servicos = favorites
        if (this.lista_servicos.length === 0) {
          this.notFound();
        }
      }
    })
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

  clearTokenAndLeave() {
    this.storage.set('access_token', null).then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.navigateRoot('/login');
       });
    });
  }

  notFound() {
    this.not_found = true;
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();    
  }

  openFavorite(item) {
   
  }
}
