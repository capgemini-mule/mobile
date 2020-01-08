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

  // TODO Antes de trocar as urls abaixo do mock de Rubens, desabilitar as políticas do CORS para requisições funcionarem
  // Para burlar isso executar comando abaixo com o chrome fechado e depois executar o ionic serve
  // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

  // readonly URL_BASE: string = "https://anypoint.mulesoft.com/mocking/api/v1/links/"
  // readonly URL_LOGIN: string = this.URL_BASE + "ca554d74-2844-4b7e-9b2f-e20af00c1b3a/token"
  // readonly URL_LOGOUT: string = this.URL_BASE + "ca554d74-2844-4b7e-9b2f-e20af00c1b3a/logout"
  // readonly URL_CADASTRAR: string = this.URL_BASE + "ca554d74-2844-4b7e-9b2f-e20af00c1b3a/signup"
  // readonly URL_PERFIL: string = this.URL_BASE + "e96134f6-d18a-4a7c-ba8e-6910803d3d4e/userinfo/{email}"
  // readonly URL_SERVICOS: string = this.URL_BASE + "dc3079af-d042-47a5-9717-1f3d0b952947/servicos"
  // readonly URL_MATRICULA_SERIES: string = this.URL_BASE + "87a1aece-9fc5-47f9-b17e-94d6ed1f0d1a/series/{dataNascimento}"
  // readonly URL_MATRICULA_ESCOLAS: string = this.URL_BASE + "87a1aece-9fc5-47f9-b17e-94d6ed1f0d1a/series/{dataNascimento}"
  // readonly URL_MATRICULA_INSCRICAO: string = this.URL_BASE + "87a1aece-9fc5-47f9-b17e-94d6ed1f0d1a/inscricao"

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

  getAccessToken() {
    if (AutenticacaoService.usuario) {
      return AutenticacaoService.usuario.accessToken
    }
    return ""
  }

  private getDefaultRequestOptions() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );   
    headers.append("Authorization", 'Bearer ' + this.getAccessToken());
    return new RequestOptions({ headers: headers });
  }

  public get(link="") {    
    return this.http.get(link, this.getDefaultRequestOptions()); 
  }

  public post(link="", payload="") {
    return this.http.post(link, payload, this.getDefaultRequestOptions());
  }
}
