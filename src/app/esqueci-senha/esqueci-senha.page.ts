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


  esqueci_senha(){

    if(this.formEsqueci.email===""){  this.inputemail.setFocus(); }
    else{
      
      this.presentLoading("Efetuando solicitação de nova senha, aguarde...");
      
      setTimeout( () => {
        
          this.presentAlert("Esqueci minha senha", "", "Link para gerar nova senha enviada por e-mail.").then(()=>{
              this.navCtrl.navigateRoot('/login');
          })
          
      }, 3000);
      
    }

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
