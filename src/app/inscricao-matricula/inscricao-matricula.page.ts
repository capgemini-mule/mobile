import { Component, OnInit } from '@angular/core';
import { DialogService } from './../services/ui/dialog.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-inscricao-matricula',
  templateUrl: './inscricao-matricula.page.html',
  styleUrls: ['./inscricao-matricula.page.scss'],
})
export class InscricaoMatriculaPage implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, 
    private dialogService: DialogService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.getSeries()
    this.getEscolas()
    //this.inscrever()
  }

  getSeries() {
    this.dialogService.showLoading("Carregando séries");
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

  getEscolas() {
    this.dialogService.showLoading("Carregando escolas");
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

  inscrever() {
    this.dialogService.showLoading("Fazendo Inscrição...")
        this.autenticacaoService.post(this.autenticacaoService.URL_MATRICULA_INSCRICAO, '').subscribe( result => {
          let resposta = result.json()
            
        }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
        });
  }
}
