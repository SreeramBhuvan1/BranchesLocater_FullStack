import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { CitiesComponent } from './cities/cities.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate, canActivate2 } from './auth/auth.guard';
import { CreateCityComponent } from './cities/create-city/create-city.component';
import { CitiesDetailedViewComponent } from './cities/cities-detailed-view/cities-detailed-view.component';
import { CityStartComponent } from './cities/city-start/city-start.component';
import { BranchStartComponent } from './branches/branch-start/branch-start.component';
import { BranchEditComponent } from './branches/branch-edit/branch-edit.component';
import { BranchDetailsComponent } from './branches/branch-details/branch-details.component';
import { BranchWeatherComponent } from './branches/branch-weather/branch-weather.component';




const routes: Routes = [
  { path: '', redirectTo: 'branches', pathMatch: 'full' },
  {
    path: 'branches', component: BranchesComponent, canActivate: [canActivate], children: [
      { path: '', component: BranchStartComponent },
      { path: 'add', component: BranchEditComponent },
      { path: ':id', component: BranchDetailsComponent },
      { path: ':id/edit', component: BranchEditComponent },
      { path: ':id/weather', component: BranchWeatherComponent }
    ]
  },
  {
    path: 'cities', component: CitiesComponent, canActivate: [canActivate], children: [
      { path: '', component: CityStartComponent },
      { path: 'add', component: CreateCityComponent },
      { path: ':id', component: CitiesDetailedViewComponent },
      { path: ':id/edit', component: CreateCityComponent },
    ]
  },
  { path: 'auth', component: AuthComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
