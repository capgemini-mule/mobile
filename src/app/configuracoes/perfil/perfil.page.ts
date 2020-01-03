import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DialogService } from '../../services/ui/dialog.service';
import { AutenticacaoService } from '../../services/autenticacao.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalController: ModalController, public autenticacaoService: AutenticacaoService, private dialogService: DialogService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.iniciaDadosUsuario();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  iniciaDadosUsuario() {

    this.dialogService.showLoading("Carregando dados do usuário, aguarde...");
    this.autenticacaoService.get(this.autenticacaoService.URL_PERFIL)
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
            this.autenticacaoService.usuario = result.json()
          })          
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
        });
  }
}
