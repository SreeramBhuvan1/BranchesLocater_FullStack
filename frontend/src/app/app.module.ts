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
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    MenubarModule,
    BrowserAnimationsModule,
    ImageModule,
    InputTextModule,
    FormsModule,
    ToolbarModule,
    AccordionModule,
    ButtonModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
