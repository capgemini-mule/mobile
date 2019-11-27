import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  login(){
    console.log("Acessando login");
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  cadastre_se(){
    console.log("Cadastrar-se");
    this.navCtrl.navigateForward('/cadastrar-usuario');
    
  }

  esqueci_senha(){
    console.log("Esqueci minha senha");
    this.navCtrl.navigateForward('/esqueci-senha');
    
  }

  openLinkExterno(local){
    console.log("local",local)
    window.open(local);
  }

}
