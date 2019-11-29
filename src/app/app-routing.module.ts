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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
