import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  input_search: any = false;

  lista_servicos: any = [];

  constructor(public navCtrl: NavController, public alertController: AlertController) {

  }

  ngOnInit(){
    this.lista_servicos = [
      {icon: "ribbon", label: "Certificado Digital", acao:"#"},
      {icon: "car", label: "Veículos e Condutores", acao:"#"},
      {icon: "person", label: "Emissão de Carteira de Identidade", acao:"#"},
      {icon: "book", label: "Educação", acao:"#"},
      {icon: "medkit", label: "Saúde", acao:"#"},
      {icon: "unlock", label: "Segurança", acao:"#"},
      {icon: "bus", label: "Rodovias e Transportes", acao:"#"}
    ]
  }

  filtrarServicos(value){
    console.log("setFilteredItems", value.target.value)
  }

  ocultarSearch(){
    this.input_search = false;
  }

  openSearch(){
    this.input_search = true;
  }

  async logoff(){

    const alert = await this.alertController.create({
      header: 'Logoff',
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
            console.log('logoff realizado');
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();

  }

}
