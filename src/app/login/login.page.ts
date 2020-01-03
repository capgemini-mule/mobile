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
    
  }

  ngAfterViewInit() {
    this.storage.get('access_token').then((val) => {
      if(val != null) {
        this.navCtrl.navigateRoot('/tabs/tab1');
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
        this.autenticacaoService.post(this.autenticacaoService.URL_LOGIN, JSON.stringify(this.formLogin)).subscribe( result => {
              let autenticacao = result.json()
              this.dialogService.hideLoading(() => {
                if(autenticacao.access_token) {
                  this.storage.set('access_token', autenticacao);
                  this.navCtrl.navigateRoot('/tabs/tab1');
                } else {
                  this.dialogService.showDialog(this.dialogService.WARNING, "", "Usuário ou senha inválidos");
                }
              })
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
        });
    }
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
