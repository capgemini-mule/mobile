import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  loading: any;
  isLoading = false;

  readonly WARNING: string = "ATENÇÃO"
  readonly ERROR: string = "Erro!"
  readonly CONSOLE_TAG: string = "CONSOLE_TAG: "
  readonly FILL_EMAIL: string = "Preencha o e-mail."
  readonly FILL_PASSWORD: string = "Preencha a senha."
  readonly FILL_SIGLA: string = "Preencha a sigla."
  readonly FILL_NOME: string = "Preencha o nome."


  constructor(public alertController: AlertController, public loadingController: LoadingController) { 

  }

   async showLoading(message = null) {
    if (!message) {
      message = "Carregando"
    }

    this.hideLoading();

    this.isLoading = true;
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present()
      .then(() => {
        if (!this.isLoading) {
          this.hideLoading();
        }
      });   
  }

  async hideLoading(callback = null) {
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading = null;
    this.isLoading = false;

    if (callback != null) {
      callback();
    }
  }

  async showDialog(title = "", subTitle = "", message = "", buttons = null, onDismiss : Function = null) {
    this.hideLoading();
    
    if (buttons === null) {
      buttons = []
      buttons.push({text: 'OK'})
      //if (hasCancelButton) {
      //  buttons.push({text: 'Cancelar', role: 'cancel', cssClass: 'secondary'})
      //}
    }
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: buttons,
    });

    alert.onDidDismiss().then(()=>{
      if (onDismiss) onDismiss();
    });

    await alert.present();
  }

  confirm(message: string) {
    return new Promise((resolve) => {

      this.alertController.create({
        message: message,
        buttons : [
          { text : "Não", role: "cancel", handler : () =>{ resolve(false); }},
          { text : "Sim", handler : () =>{ resolve(true); }},
        ]
      }).then((alert)=>{
        alert.present();
      });

    });
  }
}
