import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonInput, AlertController, NavController, LoadingController } from '@ionic/angular';

import { AutenticacaoService } from '../services/autenticacao.service'

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

  loading: any;
  
  constructor(public navCtrl: NavController, private alertController: AlertController, public AutenticacaoService: AutenticacaoService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

   isValidCpf(cpf) {
    if (cpf === null) return false;
    cpf = cpf.toString().trim().replace(/\D/g, '').replace('.', '').replace('-', '-');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
}

  cadastrar(){

    if(this.formCadastro.nome===""){  this.inputFirstName.setFocus(); }
    else if(this.formCadastro.sobrenome===""){  this.inputLastName.setFocus(); }
    else if(!this.isValidCpf(this.formCadastro.cpf)){  this.inputCpf.setFocus(); }
    else if(!this.isValidEmail(this.formCadastro.email)){  this.inputEmail.setFocus(); }
    else if(this.formCadastro.senha===""){  this.inputPassword.setFocus(); }
    else if(this.formCadastro.confirmarSenha===""){  this.inputConfirmPassword.setFocus(); }
    else if(this.formCadastro.senha!==this.formCadastro.confirmarSenha){ 
        this.presentAlert("Senha", "", "A senha e a confirmação de senha não coincidem."); 
        this.inputPassword.setFocus(); 
    }else if(this.formCadastro.accept===false){  
        this.presentAlert("Termos de Uso", "", "É necessário aceitar os termos de uso para prosseguir com o cadastro.");
    }else{
      console.log("formCadastro",this.formCadastro)
      this.presentLoading("Efetuando cadastro, aguarde...");
      
      this.AutenticacaoService.post("http://autorizacao-cogel-proxy.br-s1.cloudhub.io/signup", JSON.stringify(this.formCadastro))
        .subscribe( result => {
              let retorno = result.json();

              if(retorno.message==="Cadastro concluído com sucesso. Você pode fazer login com suas credenciais."){
                this.loading.onDidDismiss().then(()=>{
                  this.presentAlert("Cadastro", "", "Cadastro Efetuado com Sucesso.").then(()=>{
                    this.navCtrl.navigateRoot('/login');
                  })
                });
              }else{
                this.loading.onDidDismiss().then(()=>{
                  this.presentAlert("Atenção", "Validação de formulário", "Dados inválidos.");
                });
              }
              
        }, err =>{
          this.presentAlert("Atenção!", "Validação de formulário", "Dados inválidos.");
        });
    }
  }

  async presentAlert(title, subTitle, message) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      message: message,
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
