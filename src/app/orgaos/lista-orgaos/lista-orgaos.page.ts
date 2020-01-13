import { Component, OnInit } from '@angular/core';
import { Orgao } from 'src/app/types/Orgao';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { NavegacaoService } from 'src/app/services/ui/navegacao.service';

@Component({
  selector: 'app-lista-orgaos',
  templateUrl: './lista-orgaos.page.html',
  styleUrls: ['./lista-orgaos.page.scss'],
})
export class ListaOrgaosPage implements OnInit {

  listaOrgaos : Orgao[] = [];
  // listaOrgaos : Orgao[] = [
  //   { codigo: 1, sigla : 'S1', nome : "Secretaria 1"},
  //   { codigo: 2, sigla : 'S2', nome : "Secretaria 2"},
  //   { codigo: 3, sigla : 'S3', nome : "Secretaria 3"},
  // ];

  constructor(private navCtrl: NavController,
    private navegacaoService: NavegacaoService,
    private autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.requestLista();
  }

  requestLista() {
    this.dialogService.showLoading("Carregando orgãos, aguarde...");
    this.autenticacaoService.get(this.autenticacaoService.URL_ORGAO)
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
              this.listaOrgaos = result.json();
          });
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR, null, ()=>{
              this.navCtrl.pop();
            });
          });
      });
  }

  editar(orgao: Orgao) {
    this.navegacaoService.goToOrgao(orgao);
  }

  adicionar() {
    this.navegacaoService.goToOrgao();
  }

}
