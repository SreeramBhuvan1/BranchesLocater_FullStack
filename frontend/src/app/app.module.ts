import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImageModule } from "primeng/image";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BranchesComponent } from './branches/branches.component';
import { CitiesComponent } from './cities/cities.component';
import { AuthComponent } from './auth/auth.component';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { CityDetail } from './shared-sources/cities-model';
import { CitiesService } from './shared-sources/cities-service';
import { CitiesListComponent } from './cities/cities-list/cities-list.component';
import { CitiesDetailedViewComponent } from './cities/cities-detailed-view/cities-detailed-view.component';
import { CreateCityComponent } from './cities/create-city/create-city.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CityStartComponent } from './cities/city-start/city-start.component';
import { BranchListComponent } from './branches/branch-list/branch-list.component';
import { BranchDetailsComponent } from './branches/branch-details/branch-details.component';
import { BranchEditComponent } from './branches/branch-edit/branch-edit.component';
import { BranchStartComponent } from './branches/branch-start/branch-start.component';
import { DropdownModule } from 'primeng/dropdown';
import { BranchWeatherComponent } from './branches/branch-weather/branch-weather.component';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { CitiesWeatherComponent } from './cities/cities-weather/cities-weather.component';
import { CitiesBranchesComponent } from './cities/cities-branches/cities-branches.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BranchesComponent,
    CitiesComponent,
    AuthComponent,
    CitiesListComponent,
    CitiesDetailedViewComponent,
    CreateCityComponent,
    CityStartComponent,
    BranchListComponent,
    BranchDetailsComponent,
    BranchEditComponent,
    BranchStartComponent,
    BranchWeatherComponent,
    CitiesWeatherComponent,
    CitiesBranchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    HttpClientModule,
    MenubarModule,
    BrowserAnimationsModule,
    ImageModule,
    InputTextModule,
    FormsModule,
    ToolbarModule,
    AccordionModule,
    ButtonModule,
    ConfirmDialogModule,
    ListboxModule,
    MessagesModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ScrollPanelModule,
    CardModule,
    FieldsetModule,
    TableModule,
    PanelModule,
    ToastModule,
    DropdownModule,
    PasswordModule,
    MultiSelectModule,
    CalendarModule,
    MenuModule
  ],
  providers: [CitiesService, ConfirmationService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
