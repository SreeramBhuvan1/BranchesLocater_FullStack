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
import { CitiesEditComponent } from './cities/cities-detailed-view/cities-edit/cities-edit.component';



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
    CitiesEditComponent
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
    ListboxModule,
    MessagesModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ScrollPanelModule,
    CardModule,
    FieldsetModule,
    TableModule,
    PanelModule
  ],
  providers: [CitiesService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
