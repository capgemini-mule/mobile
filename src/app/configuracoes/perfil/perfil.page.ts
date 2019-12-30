import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController  } from '@ionic/angular';

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

  constructor(public modalController: ModalController, public AutenticacaoService: AutenticacaoService, public loadingController: LoadingController) {
    this.iniciaDadosUsuario();
   }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  iniciaDadosUsuario(){

    this.presentLoading("Validando acesso, aguarde...");

    this.AutenticacaoService.get("http://clientes-cogel-proxy.br-s1.cloudhub.io/userinfo/email")
        .subscribe( result => {
              this.dadosUsuario = result.json();
              this.loading.onDidDismiss();             
        }, err =>{
          // this.dadosUsuario = { nome: "Max", sobrenome: "Mulesoft", cpf: "maxmule", email: "max@mulesoft.com" }
        });
        
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: 2000
    });
    await this.loading.present();    
  }

}
