import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UploadsComponent
  ],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UploadsModule { }
