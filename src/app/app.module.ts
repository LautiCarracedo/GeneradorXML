import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GenerarXmlComponent } from './components/generar-xml/generar-xml.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { BpcComponent } from './components/bpc/bpc.component';
import { OtrosEntesComponent } from './components/otros-entes/otros-entes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarEnteComponent } from './components/agregar-ente/agregar-ente.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateBPCComponent } from './components/update-bpc/update-bpc.component'
import { DownloadService } from './services/download.service';
import { UpdateValoresBpcComponent } from './components/update-valores-bpc/update-valores-bpc.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerarXmlComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BodyComponent,
    BpcComponent,
    OtrosEntesComponent,
    AgregarEnteComponent,
    UpdateBPCComponent,
    UpdateValoresBpcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
