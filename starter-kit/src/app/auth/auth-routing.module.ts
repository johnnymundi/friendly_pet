import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoUsuarioComponent } from './novo-usuario.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: marker('Login') } },
  { path: 'novousuario', component: NovoUsuarioComponent, data: { title: marker('NovoUsuario') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
