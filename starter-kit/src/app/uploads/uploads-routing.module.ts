import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { UploadsComponent } from './uploads.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'upload', component: UploadsComponent, data: { title: marker('Upload') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UploadsRoutingModule { }
