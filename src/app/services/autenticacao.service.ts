import { Usuario } from './../types/Usuario';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { DialogService } from './../services/ui/dialog.service';
import { NavController, AlertController } from '@ionic/angular';
import { Orgao } from '../types/Orgao';
import { ApiService } from './api.service';
import { RequestInscricaoMatricula } from '../types/RequestInscricaoMatricula';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly STORAGE_KEY_USER = "lastUser"

  public static usuario = new Usuario()


  constructor(private storage: Storage, 
    private dialogService: DialogService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private apiService: ApiService) { 
  }

  public login(usuario: string, senha: string) {
    return new Promise<any>((resolve, reject) => {
      this.apiService.request({
        method: "POST",
        url: this.apiService.URL_LOGIN,
        body : {
          username: usuario,
          password: senha
        }
      })
      .then((result) => {
        let autenticacao = result.json;
        if(autenticacao.access_token) {
          this.dadosUsuario(usuario, autenticacao.access_token)
            .then(resolve)
            .catch(reject);
        } else {
          reject({mensagem : "Usuário ou senha inválidos"});
        }
      })
      .catch(reject);
    });
  }

  public dadosUsuario(email: string, acessToken: string) {
    return new Promise<any>((resolve, reject) =>{
      this.apiService.request({
        method: 'GET',
        url : this.apiService.URL_PERFIL.replace('{email}', email),
      }).then( result => {
        AutenticacaoService.usuario = result.json
        AutenticacaoService.usuario.accessToken = acessToken
        this.apiService.setAccessToken(acessToken);
        resolve();
      }, reject);
    }); 
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
            this.apiService.request({
              method: 'POST',
              url: this.apiService.URL_LOGOUT,
            }).then(result => {
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

  cadastrarUsuario(form: any) {
    return this.apiService.request({
      method: "post",
      url: this.apiService.URL_CADASTRAR,
      body: form
    });
  }

  listarServicos()  {
    return this.apiService.request({
      url: this.apiService.URL_SERVICOS
    }); 
  }

  listarTiposIdentificacao() {
    return this.apiService.request({
      url: this.apiService.URL_TIPOS_IDENTIFICACAO
    });
  }

  listarSeries() {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_SERIES.replace('{dataNascimento}', AutenticacaoService.usuario.dataNascimento)
    });
  }

  listarEscolas() {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_ESCOLAS.replace('{codSerie}', '1')
    });
  }

  inscreverAluno(request: RequestInscricaoMatricula) {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_INSCRICAO,
      body: request
    });
  }

  ////////////
  // orgaos

  listarOrgaos() {
    return this.apiService.request({
      url: this.apiService.URL_ORGAO
    });
  }

  public salvarOrgao(orgao: Orgao) {
    let method;
    let url = `${this.apiService.URL_ORGAO}`;
    if (orgao.codigo) {
      method = "POST";
      url += `/${orgao.codigo}`;
    } else {
      method = "PUT";
    }

    return this.apiService.request({
      method: method,
      url: url,
      body : orgao
    });
  }

  public deletarOrgao(orgao: Orgao) {
    return this.apiService.request({
      method: "DELETE",
      url: `${this.apiService.URL_ORGAO}/${orgao.codigo}`,
      body : orgao
    });
  }

}
