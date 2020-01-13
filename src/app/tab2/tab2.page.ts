import { FavoriteService } from './../services/favorite.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service';
import { NavegacaoService } from '../services/ui/navegacao.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  not_found: any = false;
  lista_servicos: any = [];

  constructor(public navCtrl: NavController, private favoriteService: FavoriteService,
    private autenticacaoService: AutenticacaoService,
    private navegacaoService: NavegacaoService) {
    
  }

  ionViewWillEnter() {
    this.getFavoritesServices()
  }

  getFavoritesServices() {
    this.lista_servicos = this.favoriteService.favorites
    if (this.lista_servicos.length === 0) {
      this.notFound()
    } else {
      this.not_found = false
    }
  }

  notFound() {
    this.not_found = true;
  }

  openFavorite(item) {
    this.navegacaoService.goToService(item);
  }

  logoff() {
    this.autenticacaoService.logoff()
  }
}
