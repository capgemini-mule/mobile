import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  input_search: any = false;
  not_found: any = false;

  lista_servicos: any = [];
  lista_servicos_completa: any = [
    {icon: "ribbon", label: "Certificado Digital", acao:"./"},
    {icon: "car", label: "Veículos e Condutores", acao:"./"},
    {icon: "person", label: "Emissão de Carteira de Identidade", acao:"./"},
    {icon: "book", label: "Educação", acao:"./"},
    {icon: "medkit", label: "Saúde", acao:"./"},
    {icon: "unlock", label: "Segurança", acao:"./"},
    {icon: "bus", label: "Rodovias e Transportes", acao:"./"}
  ]

  constructor(public navCtrl: NavController, public alertController: AlertController, private storage: Storage) {

  }

  ngOnInit(){
    this.lista_servicos = this.lista_servicos_completa;
  }

  filtrarServicos(itemSearch){
    
    var retorno = this.lista_servicos_completa.filter(el => el.label.toLowerCase().indexOf(itemSearch.target.value.toLowerCase()) > -1 );
    
    if(retorno.length>0){
      console.log("1")
      this.not_found = false;
      this.lista_servicos = retorno;
    }else{
      console.log("3")
      this.notFound();
    }

    console.log("s",itemSearch.target.value)
    
    
  }

  notFound(){
    this.not_found = true;
  }

  ocultarSearch(){
    this.input_search = false;
    this.ngOnInit();
  }

  openSearch(){
    this.input_search = true;
  }

  async logoff(){

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
            this.storage.clear().then(() => {
              console.log('logoff realizado');
              this.navCtrl.navigateRoot('/login');
            });
          }
        }
      ]
    });

    await alert.present();

  }

}
