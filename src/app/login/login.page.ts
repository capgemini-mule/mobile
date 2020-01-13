import { DialogService } from './../services/ui/dialog.service';
import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = { username: '', password: ''}

  constructor(public navCtrl: NavController, public autenticacaoService: AutenticacaoService, private storage: Storage, private dialogService: DialogService) { 
  }

  ngOnInit() {
    //this.clearStorage()
  }

  clearStorage() {
    this.storage.clear()
  }

  ngAfterViewInit() {
    this.storage.get(this.autenticacaoService.STORAGE_KEY_USER).then((val) => {
      if(val) {
        if (val.accessToken) {
          AutenticacaoService.usuario = val
          this.dialogService.showLoading("Validando acesso, aguarde...")
          this.dadosUsuario(AutenticacaoService.usuario.email, val.accessToken)
        }
      }
    });
  }

  login() {
    if(this.formLogin.username === "") {
      this.dialogService.showDialog(this.dialogService.WARNING, "", this.dialogService.FILL_EMAIL)
    } else if (this.formLogin.password === "") {
      this.dialogService.showDialog(this.dialogService.WARNING, "", this.dialogService.FILL_PASSWORD)
    } else {
      this.dialogService.showLoading("Validando acesso, aguarde...")
        this.autenticacaoService.login(this.formLogin.username, this.formLogin.password)
        .then( result => {
          this.dialogService.hideLoading(() => {
            this.autenticacaoService.goHomeAsRoot();
          });
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
          });
        });
    }
  }

  dadosUsuario(email: string, acessToken: string) {
    this.autenticacaoService.dadosUsuario(email, acessToken)
        .then( result => {
          this.dialogService.hideLoading(() => {
            AutenticacaoService.usuario = result.json
            AutenticacaoService.usuario.accessToken = acessToken
            this.autenticacaoService.goHomeAsRoot()
          })          
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", err.mensagem);
          });
        });
  }

  cadastre_se() {
    this.navCtrl.navigateForward('/cadastrar-usuario');
  }

  esqueci_senha() {
    this.navCtrl.navigateForward('/esqueci-senha');
  }

  openLinkExterno(local) {
    window.open(local);
  }
}
