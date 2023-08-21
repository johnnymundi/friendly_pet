import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetDialogComponent } from './pet-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComentariosComponent } from './comentarios/comentarios.component';


@NgModule({
  declarations: [PetDialogComponent, ComentariosComponent],
  entryComponents: [PetDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class PetDialogModule { }
