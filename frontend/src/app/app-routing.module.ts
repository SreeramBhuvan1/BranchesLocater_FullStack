import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { CitiesComponent } from './cities/cities.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate, canActivate2 } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'branches', pathMatch: 'full' },
  { path: 'branches', component: BranchesComponent, canActivate: [canActivate] },
  { path: 'cities', component: CitiesComponent, canActivate: [canActivate] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
