import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { NovoUsuarioComponent } from './novo-usuario.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, I18nModule, AuthRoutingModule],
  exports: [LoginComponent, NovoUsuarioComponent],
  declarations: [LoginComponent, NovoUsuarioComponent],
})
export class AuthModule {}
