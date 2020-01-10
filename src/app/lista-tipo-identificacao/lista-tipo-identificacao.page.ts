import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service';
import { DialogService } from '../services/ui/dialog.service';

@Component({
  selector: 'app-lista-tipo-identificacao',
  templateUrl: './lista-tipo-identificacao.page.html',
  styleUrls: ['./lista-tipo-identificacao.page.scss'],
})
export class ListaTipoIdentificacaoPage implements OnInit {

  listaTipos = [];

  constructor(private navCtrl: NavController,
    private autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.requestLista();
  }

  requestLista() {
    this.dialogService.showLoading("Carregando lista, aguarde...");
    this.autenticacaoService.get(this.autenticacaoService.URL_TIPOS_IDENTIFICACAO)
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
              this.listaTipos = result.json();
              // this.listaTipos = [
              //   { tpi_ds_tipo_identificacao : "RG" },
              //   { tpi_ds_tipo_identificacao : "CPF" },
              //   { tpi_ds_tipo_identificacao : "e-mail" },
              // ];
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

}
