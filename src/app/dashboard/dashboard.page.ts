import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from './../services/autenticacao.service';
import { DialogService } from './../services/ui/dialog.service';
import { NavController } from '@ionic/angular';
import { FavoriteService } from './../services/favorite.service';
import { NavegacaoService } from '../services/ui/navegacao.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  lista_servicos: any = [];

  constructor(public navCtrl: NavController, public autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService, private favoriteService: FavoriteService,
    private navegacaoService: NavegacaoService) {
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
    this.autenticacaoService.listarServicos()
        .then( result => {
          let tempList = result.json;
          this.autenticacaoService.listarGrupos().then(result => {
            // grupos
            this.lista_servicos = []
            if (result && result.json.groups) {
              const groupsString = JSON.stringify(result.json.groups)
              // grupo A
              if (groupsString.includes("CN=A")) {
                this.lista_servicos.push(tempList[0])
              }
              // grupo B
              if (groupsString.includes("CN=B")) {
                this.lista_servicos.push(tempList[1])
              }
            }
            this.dialogService.hideLoading();
          }, err => {
            console.log(this.dialogService.CONSOLE_TAG, err);
            this.dialogService.hideLoading(() => {
              this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
            });
          })
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
          });
      });
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
    this.navegacaoService.goToService(item);
  }

  logoff() {
    this.autenticacaoService.logoff()
  }

}
