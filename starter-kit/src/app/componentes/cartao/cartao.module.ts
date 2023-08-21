import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaoComponent } from './cartao.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CartaoComponent],
  imports: [CommonModule, MatGridListModule, MatCardModule],
  exports: [CartaoComponent], // exportando o componente do cartão para poder utilizar
})
export class CartaoModule { }
