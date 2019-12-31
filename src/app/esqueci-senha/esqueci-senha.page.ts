import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonInput, AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  @ViewChild('email', { static:false })  inputemail: IonInput;

  formEsqueci: any = {
      email: ""
  }

loading: any;

  constructor(public navCtrl: NavController, private alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
  }


  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  esqueci_senha() {

    if(!this.isValidEmail(this.formEsqueci.email)) {  
      this.presentAlert("Atenção", "", "Preencha um e-mail válido.");
    } else {
      
      this.presentLoading("Efetuando solicitação de nova senha, aguarde...");
      
      setTimeout( () => {
        this.loading.dismiss().then(() => {
          this.presentAlert("Esqueci minha senha", "", "Link para gerar nova senha enviada por e-mail.", () => {
            this.navCtrl.navigateRoot('/login');
          })
        });
      }, 2000);
    }
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
