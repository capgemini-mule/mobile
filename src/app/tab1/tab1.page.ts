import { AutenticacaoService } from './../services/autenticacao.service';
import { DialogService } from './../services/ui/dialog.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoriteService } from './../services/favorite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  input_search: any = false;
  not_found: any = false;

  lista_servicos: any = [];
  lista_servicos_completa: any = []

  constructor(public navCtrl: NavController, public autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService, private favoriteService: FavoriteService) {
  }

  ngOnInit() {
    
  }

  getNome() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.nome
    }
    return ""
  }

  ngAfterViewInit() {
    this.dialogService.showLoading("Carregando lista de serviços, aguarde...");
    this.autenticacaoService.get(this.autenticacaoService.URL_SERVICOS)
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
              this.lista_servicos = result.json(); 
              this.lista_servicos_completa = result.json();
          });
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.notFound();
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
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

  like(item) {
  }

  favorito(item) {
    this.favoriteService.addRemoveFavorite(item)
  }

  iconColor(item) {
     if (this.favoriteService.isFavoriteLocal(item)) {
      return 'warning'
     }
     return 'light'
  }

  openService(item) {
    console.log('openService', item);
    if (item.id == "1") { // lista de tipos de documentos
      this.navCtrl.navigateForward('/lista-tipo-identificacao');
    } else {
      this.navCtrl.navigateForward('/inscricao-matricula');
    }
  }

  logoff() {
    this.autenticacaoService.logoff()
  }
}
