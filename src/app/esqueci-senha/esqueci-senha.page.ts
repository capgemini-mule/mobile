import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonInput, NavController } from '@ionic/angular';
import { DialogService } from './../services/ui/dialog.service';
import { ViewService } from './../services/ui/view.service';

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

  constructor(public navCtrl: NavController, private dialogService: DialogService, private viewService: ViewService) { }

  ngOnInit() {
  }

  esqueci_senha() {

    if(!this.viewService.isValidEmail(this.formEsqueci.email)) {  
      this.dialogService.showDialog("Atenção", "", "Preencha um e-mail válido.");
    } else {
      this.dialogService.showLoading("Efetuando solicitação de nova senha, aguarde...");
      setTimeout(() => {
        this.dialogService.hideLoading(() => {
          this.dialogService.showDialog("Esqueci minha senha", "", "Link para gerar nova senha enviada por e-mail.", [{text: 'OK', handler: () => {
            this.navCtrl.navigateRoot('/login');
          }}])
        });
      }, 2000);
    }
  }
}
