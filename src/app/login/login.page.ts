import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = { username: '', password: ''}
  loading: any;

  constructor(public navCtrl: NavController, private alertController: AlertController, public AutenticacaoService: AutenticacaoService, private storage: Storage, public loadingController: LoadingController) { 
    
  }

  ngOnInit() {
    this.storage.get('access_token').then((val) => {
      if(val!=null) {
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }

  async login() {

    if(this.formLogin.username==="") {
      this.presentAlert("Atenção", "", "Preencha o e-mail.");
    } else if (this.formLogin.password==="") {
        this.presentAlert("Atenção", "", "Preencha a senha.");
    } else {
        this.presentLoading("Validando acesso, aguarde...");
        this.AutenticacaoService.post("http://autorizacao-cogel-proxy.br-s1.cloudhub.io/token", JSON.stringify(this.formLogin)).subscribe( result => {
              let autenticacao = result.json();
              this.loading.dismiss().then(() => {
                if(autenticacao.access_token) {
                  this.storage.set('access_token', autenticacao);
                  this.navCtrl.navigateRoot('/tabs/tab1');
                } else {
                  this.presentAlert("Atenção", "", "Usuário ou senha inválidos");
                }
              });
        }, err => {
          console.log("Erro na requisição: ", err);
          this.loading.dismiss().then(() => {
            this.presentAlert("ops!", "", "Ocorreu um erro, por favor tente novamente");
          });
        });
    }
  }

  cadastre_se() {
    console.log("Cadastrar-se");
    this.navCtrl.navigateForward('/cadastrar-usuario');
  }

  esqueci_senha() {
    console.log("Esqueci minha senha");
    this.navCtrl.navigateForward('/esqueci-senha');
  }

  openLinkExterno(local) {
    console.log("local",local)
    window.open(local);
  }

  async presentAlert(title, subTitle, mensage) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      message: mensage,
      buttons: ['OK']
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
