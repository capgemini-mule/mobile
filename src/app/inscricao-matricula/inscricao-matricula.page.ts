import { Escola } from './../types/Escola';
import { Serie } from './../types/Serie';
import {RequestInscricaoMatricula} from './../types/RequestInscricaoMatricula';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DialogService } from './../services/ui/dialog.service';
import { AutenticacaoService } from '../services/autenticacao.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-inscricao-matricula',
  templateUrl: './inscricao-matricula.page.html',
  styleUrls: ['./inscricao-matricula.page.scss'],
})
export class InscricaoMatriculaPage implements OnInit {
  //series: Serie[] = [];
  //escolas:Escola[] = [];
  series: Serie[] = [{codSerie: "1", descSerie: "1º ano do Ensino Fundamental"}, {codSerie: "2", descSerie: "2º ano do Ensino Fundamental"}];
  escolas:Escola[] = [{codEscola: "1", nomeEscola: "Escola 1", endEscola: "Endereco 1"},{codEscola: "2", nomeEscola: "Escola 2", endEscola: "Endereco 2"}];
  request: RequestInscricaoMatricula = new RequestInscricaoMatricula()
  
  constructor(private autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getSeries()
  }

  getSeries() {
    this.dialogService.showLoading("Carregando séries...");
    this.autenticacaoService.get(this.autenticacaoService.URL_MATRICULA_SERIES.replace('{dataNascimento}', this.autenticacaoService.usuario.data_nascimento))
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
            let series = result.json()
            console.log('log', series)
          });
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
      });
  }

  serieChange(event: { component: IonicSelectableComponent, value: any}) {
    console.log('serie:', event.value)
    this.request.codSerie = event.value.codSerie
    this.getEscolas()
  }

  getEscolas() {
    this.dialogService.showLoading("Carregando escolas...");
    this.autenticacaoService.get(this.autenticacaoService.URL_MATRICULA_ESCOLAS.replace('{codSerie}', '1'))
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
            let escolas = result.json()
            console.log('log', escolas)
          });
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
      });
  }

  escolaChange(event: {component: IonicSelectableComponent, value: any}) {
    console.log('escola:', event.value);
    this.request.codEscola = event.value.codEscola
  }

  checarIncricao() {
    if (this.request.codSerie === null) {
      this.dialogService.showDialog("Matrícula", "", "Por favor, selecione uma série");
    } else if (this.request.codEscola === null) {
      this.dialogService.showDialog("Matrícula", "", "Por favor, selecione uma escola");
    } else {
      this.inscrever()
    }
  }

  inscrever() {
    this.dialogService.showLoading("Fazendo Inscrição...")
    this.autenticacaoService.post(this.autenticacaoService.URL_MATRICULA_INSCRICAO, JSON.stringify(this.request)).subscribe( result => {
      let resposta = result.json()
      if (resposta.numeroInscricao) {
        this.dialogService.hideLoading(() => {
          this.dialogService.showDialog("Matrícula", "", "Matrícula Efetuada com Sucesso!", [{text: 'OK', handler: () => {
            this.navCtrl.navigateBack('/tabs/tab1')
          }}])
        })
      } else {
        this.dialogService.hideLoading(() => {
          this.dialogService.showDialog(this.dialogService.ERROR, "", "Erro ao fazer o cadastro, por favor tente novamente");
        })
      }
    }, err => {
      console.log(this.dialogService.CONSOLE_TAG, err);
      this.dialogService.hideLoading(() => {
        this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
      });
    });
  }
}
