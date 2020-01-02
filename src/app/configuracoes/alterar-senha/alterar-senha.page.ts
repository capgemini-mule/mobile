import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { DialogService } from '../../services/ui/dialog.service';
import { ViewService } from '../../services/ui/view.service';

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

  constructor(public modalController: ModalController, private dialogService: DialogService, private viewService: ViewService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  alterar_senha() {

    if(this.formAlterarSenha.old_password === "") { this.inputoldpassword.setFocus(); }
    else if(this.formAlterarSenha.password === "") { this.inputpassword.setFocus(); }
    else if(this.formAlterarSenha.confirmPassword === "") { this.inputconfirmPassword.setFocus(); }
    else if(this.formAlterarSenha.password !== this.formAlterarSenha.confirmPassword) {
      this.dialogService.showDialog("Senha", "", "A senha e a confirmação de senha não coincidem.");
      this.inputconfirmPassword.setFocus();
  } else {
    this.dialogService.showLoading("Efetuando alteração de senha, aguarde...");
      setTimeout( () => {
        this.dialogService.hideLoading(() => {
          this.dialogService.showDialog("Alterar Senha", "", "senha alterada com suscesso", [{text: 'OK', handler: () => {
              this.closeModal();
          }}])
        })
      }, 2000);
    }
  }
}
