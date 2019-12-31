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

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.presentLoading("Carregando lista de serviços, aguarde...");
    this.AutenticacaoService.get("http://servicos-cogel-proxy.br-s1.cloudhub.io/servicos")
        .subscribe( result => {
          this.loading.dismiss().then(() => {
              this.lista_servicos = result.json(); 
              this.lista_servicos_completa = result.json();
          });
      }, err => {
          this.loading.dismiss().then(() => {
            this.notFound();
          });
      });
  }

  filtrarServicos(itemSearch) {
    
    var retorno = this.lista_servicos_completa.filter(el => el.label.toLowerCase().indexOf(itemSearch.target.value.toLowerCase()) > -1 );
    
    if(retorno.length > 0) {
      this.not_found = false;
      this.lista_servicos = retorno;
    } else {
      this.notFound();
    }
    console.log("s",itemSearch.target.value)
  }

  notFound() {
    this.not_found = true;
  }

  ocultarSearch() {
    this.input_search = false;
    this.ngOnInit();
  }

  openSearch() {
    this.input_search = true;
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

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();    
  }

  like(item) {
    console.log("item - like", item);
    //this.presentLoading("Curtida sendo realizada... :-)");
  }

  favorito(item) {
    this.addRemoveFavorite(item)
  }

  addRemoveFavorite(item) {
    this.storage.get('servicos_favoritos').then((favoritesString) => {
      let favorites = JSON.parse(favoritesString)
      if (favorites !== null && favorites.length > 0) {
        if (favorites.filter(x => x.id === item.id).length > 0) {
          favorites = favorites.filter(x => x.id !== item.id)
        } else {
          favorites.push(item)
        }
      } else {
        favorites = []
        favorites.push(item)
      }
      this.storage.set('servicos_favoritos', JSON.stringify(favorites))
    });
  }

  isFavorite(item) {
    this.storage.get('servicos_favoritos').then((favoritesString) => {
      let favorites = JSON.parse(favoritesString)
      if (favorites !== null && favorites.length > 0) {
        if (favorites.filter(x => x.id === item.id).length > 0) {
          return true
        }
      }
      return false
    });
    return false
  }

  iconColor(item) {
    if (this.isFavorite(item)) {
      return 'yellow'
    }
    return 'black'
  }

  openService(item) {
    console.log("item", item)
  }
}
