import { Component, OnInit } from '@angular/core';
import { Orgao } from 'src/app/types/Orgao';
import { NavegacaoService } from 'src/app/services/ui/navegacao.service';
import { DialogService } from 'src/app/services/ui/dialog.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-orgao',
  templateUrl: './form-orgao.page.html',
  styleUrls: ['./form-orgao.page.scss'],
})
export class FormOrgaoPage implements OnInit {

  formOrgao = {
    sigla : '',
    nome : ''
  }

  private orgao: Orgao;

  constructor(private navegacaoService: NavegacaoService,
    private dialogService: DialogService,
    private autenticacaoService: AutenticacaoService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.orgao = this.navegacaoService.getOrgao();
    if (this.orgao) {
      this.formOrgao.sigla = this.orgao.sigla;
      this.formOrgao.nome = this.orgao.nome;
    }
  }

  salvar() {
    this.formOrgao.sigla = this.formOrgao.sigla.trim();
    this.formOrgao.nome = this.formOrgao.nome.trim();

    if(!this.formOrgao.sigla) {
      this.dialogService.showDialog(this.dialogService.WARNING, "", this.dialogService.FILL_SIGLA);
      return;
    }
    if(!this.formOrgao.nome) {
      this.dialogService.showDialog(this.dialogService.WARNING, "", this.dialogService.FILL_NOME);
      return;
    }

    let orgao = new Orgao();
    orgao.nome = this.formOrgao.nome;
    orgao.sigla = this.formOrgao.sigla;
    if (this.orgao) {
      // atualizar
      orgao.codigo = this.orgao.codigo;
    }

    this.dialogService.showLoading("Salvando os dados, aguarde...");
    this.autenticacaoService.salvarOrgao(orgao)
        .subscribe( result => {
          this.dialogService.hideLoading();
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
      });
  }

  deletar() {
    this.dialogService.confirm("Deseja remover o orgão?")
      .then((confirmed) => {
        if (confirmed) this.requestDelete();
      });
  }

  private requestDelete() {
    this.dialogService.showLoading("Removendo o orgão, aguarde...");
    this.autenticacaoService.salvarOrgao(this.orgao)
        .subscribe( result => {
          this.dialogService.hideLoading(() => {
            this.navCtrl.pop();
          });
      }, err => {
          console.log(this.dialogService.CONSOLE_TAG, err);
          this.dialogService.hideLoading(() => {
            this.dialogService.showDialog(this.dialogService.ERROR, "", this.dialogService.GENERIC_ERROR);
          });
      });
  }

}