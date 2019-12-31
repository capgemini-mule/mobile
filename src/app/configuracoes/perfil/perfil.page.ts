import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController  } from '@ionic/angular';

import { AutenticacaoService } from '../../services/autenticacao.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  loading: any;
  dadosUsuario: any = {
      nome: "",
      sobrenome: "",
      cpf: "",
      email: ""
  }

  constructor(public modalController: ModalController, public AutenticacaoService: AutenticacaoService, private alertController: AlertController, public loadingController: LoadingController) {
    this.iniciaDadosUsuario();
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  iniciaDadosUsuario() {

    this.presentLoading("Carregando dados do usuário, aguarde...");

    this.AutenticacaoService.get("http://clientes-cogel-proxy.br-s1.cloudhub.io/userinfo/email")
        .subscribe( result => {
          this.loading.dismiss().then(() => {
              this.dadosUsuario = result.json();
          })          
        }, err => {
          // this.dadosUsuario = { nome: "Max", sobrenome: "Mulesoft", cpf: "maxmule", email: "max@mulesoft.com" }
          console.log("Erro na requisição: ", err);
          this.loading.dismiss().then(() => {
            this.presentAlert("ops!", "", "Ocorreu um erro, por favor tente novamente");
          });
        });
  }

  async presentAlert(title, subTitle, message, okCompletion = null) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: [{text: 'OK', handler: okCompletion}]
    });

    await alert.present();
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();    
  }
}
