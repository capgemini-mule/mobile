import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { TextoGeralPageModule } from './configuracoes/texto-geral/texto-geral.module';
import { PerfilPageModule } from './configuracoes/perfil/perfil.module';
import { AlterarSenhaPageModule } from './configuracoes/alterar-senha/alterar-senha.module';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({mode: 'md'}),
    AppRoutingModule,
    HttpModule,
    IonicStorageModule.forRoot(),

    TextoGeralPageModule,
    PerfilPageModule,
    AlterarSenhaPageModule,
    IonicSelectableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Keyboard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
