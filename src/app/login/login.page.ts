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
    //VERIFICAÇÃO SE USUÁRIO JÁ ESTÁ LOGADO
    this.storage.get('userProfile').then((val) => {
      if(val!=null){
        this.navCtrl.navigateRoot('/tabs/tab1');
      }

    });
  }
  

  async login() {

    if(this.formLogin.username==="") {
      this.presentAlert("Atenção", "Validação de formulário", "É necessário o preenchimento do campo E-mail.");
    }else if(this.formLogin.password===""){
        this.presentAlert("Atenção", "Validação de formulário", "É necessário o preenchimento do campo Senha.");
    }else{

        this.presentLoading("Validando acesso, aguarde...");

        this.AutenticacaoService.post("http://autorizacao-cogel-proxy.br-s1.cloudhub.io/token", JSON.stringify(this.formLogin)).subscribe( result => {
              let autenticacao = result.json();

              if(autenticacao.access_token) {
                this.storage.set('userProfile', autenticacao);
                this.loading.onDidDismiss();
                this.navCtrl.navigateRoot('/tabs/tab1');
              } else {
                this.presentAlert("Atenção", "Validação de formulário", "Dados inválidos.");
                this.loading.onDidDismiss();
              }
              
        }, err =>{
          console.log("ops, algum erro", err);          
        });
        
    }
    
  }

  cadastre_se(){
    console.log("Cadastrar-se");
    this.navCtrl.navigateForward('/cadastrar-usuario');
    
  }

  esqueci_senha(){
    console.log("Esqueci minha senha");
    this.navCtrl.navigateForward('/esqueci-senha');
    
  }

  openLinkExterno(local){
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
      message: message,
      duration: 2000
    });
    await this.loading.present();    
  }

}
