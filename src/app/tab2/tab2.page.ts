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
  lista_servicos_completa: any = []

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage, public AutenticacaoService: AutenticacaoService, public loadingController: LoadingController) {
    
  }

  ngOnInit() {

    //this.presentLoading("Carregando lista de favoritos, aguarde...");

    //this.AutenticacaoService.get("http://cogel-security-proxy.us-e2.cloudhub.io/favorites")
    //    .subscribe( result => {
    //        this.lista_servicos = result.json();
    //  }, err =>{
            this.notFound();
    //  });
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
    console.log("item", item)
    this.presentLoading("Serviço em desenvolvimento, aguarde...");
  }

}
