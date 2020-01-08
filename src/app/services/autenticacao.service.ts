import { Usuario } from './../types/Usuario';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DialogService } from './../services/ui/dialog.service';
import { NavController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly STORAGE_KEY_USER = "lastUser"

  readonly URL_LOGIN: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/token"
  readonly URL_LOGOUT: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/logout"
  readonly URL_CADASTRAR: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/signup"
  readonly URL_PERFIL: string = "http://clientes-cogel-proxy.br-s1.cloudhub.io/userinfo/{email}"
  readonly URL_SERVICOS: string = "http://servicos-cogel-proxy.br-s1.cloudhub.io/servicos"
  readonly URL_MATRICULA_SERIES: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/series/{dataNascimento}"
  readonly URL_MATRICULA_ESCOLAS: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/escolas/{codSerie}"
  readonly URL_MATRICULA_INSCRICAO: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/inscricao"

  // { nome: "Max", sobrenome: "Mulesoft", cpf: "maxmule", email: "max@mulesoft.com" }
  public static usuario = new Usuario()


  constructor(public http: Http, private storage: Storage, 
    private dialogService: DialogService,
    public navCtrl: NavController,
    public alertController: AlertController) { 

  }

  async logoff() {
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelando logoff');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.dialogService.showLoading("Saindo...");
            this.post(this.URL_LOGOUT).subscribe(result => {
              this.clearUserAndLeave()
            }, err => {
              console.log(this.dialogService.CONSOLE_TAG, err);
              this.clearUserAndLeave()    
            });
          }
        }
      ]
    });

    await alert.present();
  }

  clearUserAndLeave() {
    this.setUser(null, () => {
      this.dialogService.hideLoading(() => {
        this.goToLogin()
       });
    })
  }

  public getUser() {
    return this.storage.get(this.STORAGE_KEY_USER).then((val) => {
      return val
    });
  }

  public setUser(user: Usuario, callback = null) {
    this.storage.set(this.STORAGE_KEY_USER, user).then(() => {
      AutenticacaoService.usuario = user
      if (callback !== null) {
        callback()
      }
    });
  }

  public goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  public goHomeAsRoot() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  private getDefaultRequestOptions() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );   
    headers.append("Authorization", 'Bearer ' + AutenticacaoService.usuario.accessToken);
    return new RequestOptions({ headers: headers });
  }

  public get(link="") {    
    return this.http.get(link, this.getDefaultRequestOptions()); 
  }

  public post(link="", payload="") {
    return this.http.post(link, payload, this.getDefaultRequestOptions());
  }
}
