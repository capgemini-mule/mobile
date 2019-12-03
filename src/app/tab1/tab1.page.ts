import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  input_search: any = false;
  not_found: any = false;
  loading: any;

  lista_servicos: any = [];
  lista_servicos_completa: any = []

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage, public loadingController: LoadingController, public AutenticacaoService: AutenticacaoService) {

  }

  ngOnInit(){

    this.presentLoading("Carregando lista de serviços, aguarde...");

    this.AutenticacaoService.get("http://cogel-security-proxy.us-e2.cloudhub.io/services")
        .subscribe( result => {
            this.lista_servicos = result.json(); 
      }, err =>{
            // this.dadosUsuario = { firstName: "Max", lastName: "Mulesoft", username: "maxmule", email: "max@mulesoft.com" }
            this.notFound();
      });
    // this.lista_servicos = this.lista_servicos_completa;
  }

  filtrarServicos(itemSearch){
    
    var retorno = this.lista_servicos_completa.filter(el => el.label.toLowerCase().indexOf(itemSearch.target.value.toLowerCase()) > -1 );
    
    if(retorno.length>0){
      console.log("1")
      this.not_found = false;
      this.lista_servicos = retorno;
    }else{
      console.log("3")
      this.notFound();
    }

    console.log("s",itemSearch.target.value)
    
    
  }

  notFound(){
    this.not_found = true;
  }

  ocultarSearch(){
    this.input_search = false;
    this.ngOnInit();
  }

  openSearch(){
    this.input_search = true;
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

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: 2000
    });
    await this.loading.present();    
  }

  like(item){
    console.log("item - like", item);
    this.presentLoading("Curtida sendo realizada... :-)");
  }

  favorito(item){
    console.log("item - favorito", item);
    this.presentLoading("Item sendo acrescentado aos favoritos... :-)");
  }

  openService(item){
    console.log("item", item)
    this.presentLoading("Serviço em desenvolvimento, aguarde...");
  }

}
