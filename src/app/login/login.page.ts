import { DialogService } from './../services/ui/dialog.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import {  NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AutenticacaoService } from '../services/autenticacao.service'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  formLogin = { username: '', password: ''}
  showFooter = true;

  private keyboardCloseListener = () => {
    this.ngZone.run(() => {
      this.showFooter = true;
    });
  };
  private keyboardOpenListener = () => {
    this.ngZone.run(() => {
      this.showFooter = false;
    });
  };

  constructor(public navCtrl: NavController,
    public autenticacaoService: AutenticacaoService,
    private storage: Storage,
    private dialogService: DialogService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private ngZone: NgZone) { 
  }

  ngOnInit() {
    //this.clearStorage()

    window.addEventListener('keyboardDidHide', this.keyboardCloseListener);
    window.addEventListener('keyboardDidShow', this.keyboardOpenListener);
  }

  ngOnDestroy() {
    window.removeEventListener('keyboardDidHide', this.keyboardCloseListener);
    window.removeEventListener('keyboardDidShow', this.keyboardOpenListener);
  }

  clearStorage() {
    this.storage.clear()
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.checkLoggedUser();
    });
  }

  private checkLoggedUser() {
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
    window.open(local, "_system");
  }
}
