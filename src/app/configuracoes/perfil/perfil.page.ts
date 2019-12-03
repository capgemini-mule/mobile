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
      firstName: "",
      lastName: "",
      username: "",
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

    this.AutenticacaoService.get("http://cogel-security-proxy.us-e2.cloudhub.io/user-info")
        .subscribe( result => {
              this.dadosUsuario = result.json();
              this.loading.onDidDismiss();             
        }, err =>{
              // this.dadosUsuario = { firstName: "Max", lastName: "Mulesoft", username: "maxmule", email: "max@mulesoft.com" }
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
