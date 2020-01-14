import { Usuario } from './../types/Usuario';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DialogService } from './../services/ui/dialog.service';
import { NavController, AlertController } from '@ionic/angular';
import { Orgao } from '../types/Orgao';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly STORAGE_KEY_USER = "lastUser"

  readonly URL_LOGIN: string = "http://autorizacao-proxy.br-s1.cloudhub.io/token"
  readonly URL_LOGOUT: string = "http://autorizacao-proxy.br-s1.cloudhub.io/logout"
  readonly URL_CADASTRAR: string = "http://autorizacao-proxy.br-s1.cloudhub.io/signup"
  readonly URL_PERFIL: string = "http://autorizacao-proxy.br-s1.cloudhub.io/userinfo/{email}"
  readonly URL_SERVICOS: string = "http://servicos-proxy.br-s1.cloudhub.io/servicos"
  readonly URL_TIPOS_IDENTIFICACAO: string = "http://tipoidentificacao-proxy.br-s1.cloudhub.io/tipoIdentificacao"
  readonly URL_ORGAO: string = "http://orgaos-proxy.br-s1.cloudhub.io/orgaos"

  // Não utilizados
  readonly URL_MATRICULA_SERIES: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/series/{dataNascimento}"
  readonly URL_MATRICULA_ESCOLAS: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/escolas/{codSerie}"
  readonly URL_MATRICULA_INSCRICAO: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/inscricao"


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
    //return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImdQUlUzY3djOURiX1dYc08tdFVuTHk2VGRBdyJ9.eyJhdWQiOiJtaWNyb3NvZnQ6aWRlbnRpdHlzZXJ2ZXI6MTgwYmYwNGQtZTJlMy00Y2Y2LWJmMTgtNzhlOTQ0NjE5NmNiIiwiaXNzIjoiaHR0cDovL2FkZnNzZW1nZS5zZW1nZS5wb2MvYWRmcy9zZXJ2aWNlcy90cnVzdCIsImlhdCI6MTU3OTAzMzMzNCwiZXhwIjoxNTc5MDM2OTM0LCJ1bmlxdWVfbmFtZSI6Im11bGVzb2Z0IiwicHJpbWFyeXNpZCI6ImEremg1MHBMWTBHVy9BM2x6R2ZhOWc9PSIsImFwcHR5cGUiOiJDb25maWRlbnRpYWwiLCJhcHBpZCI6IjI2MjAzMDhlLTkyYjYtNGJiMy05NmY4LTE1YjczNDQwNmM3NCIsImF1dGhtZXRob2QiOiJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YWM6Y2xhc3NlczpQYXNzd29yZFByb3RlY3RlZFRyYW5zcG9ydCIsImF1dGhfdGltZSI6IjIwMjAtMDEtMTRUMjA6MjI6MTQuNDYxWiIsInZlciI6IjEuMCJ9.sEgQN8H-pUbP_OgpDozY_qqGX0TdbSASNJdjGMBnOCRvSPhA5gvl6jTePUObxFtUJ0fmc1-1MAyAnnryCxg1GFRTZtGgCyCpzmq4VZUknwC2qh2D9yMjjBPHew9a94vw7ox2fny-Lz1nmW70H-a1veMV8kPo-8aNOWwFSL_NCvVUXu5ci4wPHVSS_c-Ro_mLQZ6oedgcrYolTA8dcOBa0F2xxXlbcDyIs9NE3dVsJArGXP51dCyPN5I-Wo7aTy9Iw5UlgwyOnGSllkZynxqrp0lMAw3iSoGy4SPPQSo-MeyAC4_XqoRwMG3zH12iaC8QJdoTzmzwJLW7mQHjdwZ_1w"
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

  ////////////
  // orgaos

  public salvarOrgao(orgao: Orgao) {
    if (orgao.codigo) {
      return this.http.post(`${this.URL_ORGAO}/${orgao.codigo}`, orgao, this.getDefaultRequestOptions());
    } else {
      return this.http.put(this.URL_ORGAO, orgao, this.getDefaultRequestOptions());
    }
  }

  public deletarOrgao(orgao: Orgao) {
    return this.http.delete(`${this.URL_ORGAO}/${orgao.codigo}`, this.getDefaultRequestOptions());
  }

}
