import { Component, OnInit, ViewChild } from '@angular/core';
import {  IonInput, AlertController, NavController, LoadingController } from '@ionic/angular';

import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {
  
  @ViewChild('accept', { static:false })  inputaccept: IonInput;
  @ViewChild('firstName', { static:false })  inputfirstName: IonInput;
  @ViewChild('lastName', { static:false })  inputlastName: IonInput;
  @ViewChild('username', { static:false })  inputusername: IonInput;
  @ViewChild('email', { static:false })  inputemail: IonInput;
  @ViewChild('password', { static:false })  inputpassword: IonInput;
  @ViewChild('confirmPassword', { static:false })  inputconfirmPassword: IonInput;

  formCadastro: any = {
      accept: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
  }

  loading: any;
  
  constructor(public navCtrl: NavController, private alertController: AlertController, public AutenticacaoService: AutenticacaoService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  cadastrar(){

    if(this.formCadastro.firstName==="" || this.formCadastro.firstName.lenght<5){  this.inputfirstName.setFocus(); }
    else if(this.formCadastro.lastName===""){  this.inputlastName.setFocus(); }
    else if(this.formCadastro.username===""){  this.inputusername.setFocus(); }
    else if(this.formCadastro.email===""){  this.inputemail.setFocus(); }
    else if(this.formCadastro.password===""){  this.inputpassword.setFocus(); }
    else if(this.formCadastro.confirmPassword===""){  this.inputconfirmPassword.setFocus(); }
    else if(this.formCadastro.accept===false){  
      this.presentAlert("Termos de Uso", "", "É necessário aceitar os termos de uso para prosseguir com o cadastro.");
    }else{
      console.log("formCadastro",this.formCadastro)
      this.presentLoading("Efetuando cadastro, aguarde...");
      
      this.AutenticacaoService.post("http://anypoint.mulesoft.com/mocking/api/v1/links/a17efb3a-fb82-4593-9eae-381aeb108192/sign-on", JSON.stringify(this.formCadastro))
        .subscribe( result => {
              let retorno = result.json();

              if(retorno.status==="User created successfully."){
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
              
        });

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
