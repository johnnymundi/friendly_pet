import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PetModule } from '@app/componentes/pet/pet.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, MatCardModule, PetModule],
  declarations: [HomeComponent],
})
export class HomeModule { }
