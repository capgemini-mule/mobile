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
  }

  async login(){

    if(this.formLogin.username===""){
      this.presentAlert("Atenção", "Validação de formulário", "É necessário o preenchimento do campo E-mail.");
    }else if(this.formLogin.password===""){
        this.presentAlert("Atenção", "Validação de formulário", "É necessário o preenchimento do campo Senha.");
    }else{

        this.AutenticacaoService.post("https://anypoint.mulesoft.com/mocking/api/v1/links/a17efb3a-fb82-4593-9eae-381aeb108192/token", JSON.stringify(this.formLogin))
        .subscribe( result => {
              let autenticacao = result.json();

              if(autenticacao.token){
                this.storage.set('userProfile', autenticacao);
                this.navCtrl.navigateRoot('/tabs/tab1');
              }else{
                this.presentAlert("Atenção", "Validação de formulário", "Dados inválidos.");
              }
              
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
      message: 'Hellooo',
      duration: 2000
    });
    await this.loading.present();    
  }

}
