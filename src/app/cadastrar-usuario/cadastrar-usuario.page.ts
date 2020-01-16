import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonInput } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service'
import { DialogService } from './../services/ui/dialog.service';
import { ViewService } from './../services/ui/view.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {
  
  @ViewChild('accept', { static:false })  inputAccept: IonInput;
  @ViewChild('firstName', { static:false })  inputFirstName: IonInput;
  @ViewChild('lastName', { static:false })  inputLastName: IonInput;
  @ViewChild('cpf', { static:false })  inputCpf: IonInput;
  @ViewChild('email', { static:false })  inputEmail: IonInput;
  @ViewChild('password', { static:false })  inputPassword: IonInput;
  @ViewChild('confirmPassword', { static:false })  inputConfirmPassword: IonInput;

  formCadastro: any = {
      accept: false,
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "",
      senha: "",
      confirmarSenha: ""
  }
  
  constructor(public autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService, private viewService: ViewService) { }

  ngOnInit() {
  }

  public onCpfChange($event){
    this.formCadastro.cpf = this.viewService.maskCpf(this.formCadastro.cpf)
  }

  cadastrar() {
    for (const key in this.formCadastro) {
      if (this.formCadastro.hasOwnProperty(key) && this.formCadastro[key].trim) {
        this.formCadastro[key] = this.formCadastro[key].trim();
      }
    }    

    if(this.formCadastro.nome === "") {
      this.inputFirstName.setFocus();
      this.dialogService.showDialog("Nome", "", "Preencha o nome");
    } else if(this.formCadastro.sobrenome === "") {
      this.inputLastName.setFocus();
      this.dialogService.showDialog("Sobrenome", "", "Preencha o sobrenome");
    } else if(!this.viewService.isValidCpf(this.formCadastro.cpf)) {
      this.inputCpf.setFocus();
      this.dialogService.showDialog("CPF", "", "CPF inválido");
    } else if(!this.viewService.isValidEmail(this.formCadastro.email)) {
      this.inputEmail.setFocus();
      this.dialogService.showDialog("Email", "", "Email inválido");
    } else if(this.formCadastro.senha === "") {
      this.inputPassword.setFocus();
      this.dialogService.showDialog("Senha", "", "Preencha a senha");
    } else if(this.formCadastro.confirmarSenha === "") {
      this.inputConfirmPassword.setFocus();
      this.dialogService.showDialog("Confirmação de senha", "", "Repita a senha no campo de confirmação");
    } else if(this.formCadastro.senha !== this.formCadastro.confirmarSenha) {
      this.inputConfirmPassword.setFocus();
      this.dialogService.showDialog("Senha", "", "A senha e a confirmação de senha não coincidem.");
    } else if(this.formCadastro.accept === false) {  
      this.dialogService.showDialog("Termos de Uso", "", "É necessário aceitar os termos de uso para prosseguir com o cadastro.");
    } else {
      this.dialogService.showLoading("Efetuando cadastro, aguarde...");
      this.autenticacaoService.cadastrarUsuario(this.formCadastro)
        .then( result => {
              let retorno = result.json;
              if(retorno.message === "Cadastro concluído com sucesso. Você pode fazer login com suas credenciais.") {
                this.dialogService.hideLoading(() => {
                  this.dialogService.showDialog("Cadastro", "", "Cadastro Efetuado com Sucesso.", [{text: 'OK', handler: () => {
                    this.autenticacaoService.goToLogin()
                  }}])
                });
              } else {
                this.dialogService.hideLoading(() => {
                  this.dialogService.showDialog(this.dialogService.ERROR, "", "Erro ao cadastrar usuário");
                });
              }
              
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
          });
        });
    }
  }
}
