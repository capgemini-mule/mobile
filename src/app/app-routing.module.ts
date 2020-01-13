import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'esqueci-senha',
    loadChildren: () => import('./esqueci-senha/esqueci-senha.module').then( m => m.EsqueciSenhaPageModule)
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./cadastrar-usuario/cadastrar-usuario.module').then( m => m.CadastrarUsuarioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./configuracoes/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'alterar-senha',
    loadChildren: () => import('./configuracoes/alterar-senha/alterar-senha.module').then( m => m.AlterarSenhaPageModule)
  },
  {
    path: 'texto-geral',
    loadChildren: () => import('./configuracoes/texto-geral/texto-geral.module').then( m => m.TextoGeralPageModule)
  },  {
    path: 'inscricao-matricula',
    loadChildren: () => import('./inscricao-matricula/inscricao-matricula.module').then( m => m.InscricaoMatriculaPageModule)
  },
  {
    path: 'lista-tipo-identificacao',
    loadChildren: () => import('./lista-tipo-identificacao/lista-tipo-identificacao.module').then( m => m.ListaTipoIdentificacaoPageModule)
  },
  {
    path: 'lista-orgaos',
    loadChildren: () => import('./orgaos/lista-orgaos/lista-orgaos.module').then( m => m.ListaOrgaosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
