import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DialogService } from './../services/ui/dialog.service';
import { NavController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly URL_LOGIN: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/token"
  readonly URL_LOGOUT: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/logout"
  readonly URL_CADASTRAR: string = "http://autorizacao-cogel-proxy.br-s1.cloudhub.io/signup"
  readonly URL_PERFIL: string = "http://clientes-cogel-proxy.br-s1.cloudhub.io/userinfo/email"
  readonly ULR_SERVICOS: string = "http://servicos-cogel-proxy.br-s1.cloudhub.io/servicos"

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
              this.clearTokenAndLeave()
            }, err => {
              console.log(this.dialogService.CONSOLE_TAG, err);
              this.clearTokenAndLeave()    
            });
          }
        }
      ]
    });

    await alert.present();
  }

  clearTokenAndLeave() {
    this.storage.set('access_token', null).then(() => {
      this.dialogService.hideLoading(() => {
          this.navCtrl.navigateRoot('/login');
       });
    });
  }

  private accessToken() {
    this.storage.get('access_token').then((val) => {
      return val
    })
  }

  public get(link="") {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );   
    headers.append("Authorization", 'Bearer ' + this.accessToken());
    const requestOptions = new RequestOptions({ headers: headers });
    
    return this.http.get(link, requestOptions); 
  }

  public post(link="", payload="") {

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append("Authorization", 'Bearer ' + this.accessToken()); 
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post(link, payload, requestOptions);
  }
}
