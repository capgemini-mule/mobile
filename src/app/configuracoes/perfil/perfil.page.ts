import { AutenticacaoService } from './../../services/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DialogService } from '../../services/ui/dialog.service';

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

  getNome() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.nome
    }
    return ""
  }

  getSobrenome() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.sobrenome
    }
    return ""
  }

  getCpf() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.cpf
    }
    return ""
  }

  getEmail() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.email
    }
    return ""
  }

  closeModal() {
    this.modalController.dismiss();
  }

  iniciaDadosUsuario() {

    this.dialogService.showLoading("Carregando dados do usuário, aguarde...");
    this.autenticacaoService.dadosUsuario(AutenticacaoService.usuario.email, AutenticacaoService.usuario.accessToken)
        .then( result => {
          this.dialogService.hideLoading(() => {
            const accessToken = AutenticacaoService.usuario.accessToken
            AutenticacaoService.usuario = result.json
            AutenticacaoService.usuario.accessToken = accessToken
            this.autenticacaoService.setUser(AutenticacaoService.usuario)
          })          
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
          });
        });
  }
}
