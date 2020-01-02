import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController  } from '@ionic/angular';


@Component({
  selector: 'app-texto-geral',
  templateUrl: './texto-geral.page.html',
  styleUrls: ['./texto-geral.page.scss'],
})
export class TextoGeralPage implements OnInit {

  @Input() tipo: string;
  titulo: string;
  pagina: string;

  constructor(navParams: NavParams, public modalController: ModalController) { 
    
    this.pagina = navParams.get('tipo');

    if(navParams.get('tipo')==="privacidade") {
      this.titulo = "Privacidade";
    } else if(navParams.get('tipo')==="sobre_app") {
      this.titulo = "Sobre o APP";
    } else {
      this.titulo = "Ajuda";
    }
       
  }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }
}
