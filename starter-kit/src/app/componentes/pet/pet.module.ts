import { PetDialogComponent } from './pet-dialog/pet-dialog.component';
import { CartaoModule } from './../cartao/cartao.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradePhotosComponent } from './grade-photos/grade-photos.component';
import { PetComponent } from './pet.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { PetDialogModule } from './pet-dialog/pet-dialog.module';


@NgModule({
  declarations: [GradePhotosComponent, PetComponent],
  entryComponents: [PetDialogComponent],
  imports: [
    CommonModule, CartaoModule, MatGridListModule, MatButtonModule, MatCardModule, MatToolbarModule, FlexLayoutModule, MatDialogModule, PetDialogModule],
  exports: [GradePhotosComponent],
})
export class PetModule { }
