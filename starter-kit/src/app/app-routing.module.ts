import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './shell/shell.service';

const routes: Routes = [
  // Fallback when no prior route is matched
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
  ]),
  Shell.childRoutes([
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    },
  ]),
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
