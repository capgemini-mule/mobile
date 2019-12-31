import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput, AlertController, NavController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  @ViewChild('old_password', { static:false })  inputoldpassword: IonInput;
  @ViewChild('password', { static:false })  inputpassword: IonInput;
  @ViewChild('confirmPassword', { static:false })  inputconfirmPassword: IonInput;

  formAlterarSenha: any = {
    old_password: "",
    password: "",
    confirmPassword: ""
  }

  loading: any;

  constructor(public modalController: ModalController, private alertController: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
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
      message: message,
      duration: 2000
    });
    await this.loading.present();    
  }

  alterar_senha() {

    if(this.formAlterarSenha.old_password===""){  this.inputoldpassword.setFocus(); }
    else if(this.formAlterarSenha.password===""){  this.inputpassword.setFocus(); }
    else if(this.formAlterarSenha.confirmPassword===""){  this.inputconfirmPassword.setFocus(); }
    else if(this.formAlterarSenha.password!==this.formAlterarSenha.confirmPassword) {
      this.presentAlert("Senha", "", "A senha e a confirmação de senha não coincidem.");
      this.inputpassword.setFocus();
  } else {
      this.presentLoading("Efetuando alteração de senha, aguarde...");
      setTimeout( () => {
        this.loading.dismiss().then(() => {
          this.presentAlert("Alterar Senha", "", "senha alterada com suscesso", () => {
              this.closeModal();
          })
        })
      }, 2000);
    }
  }
}
