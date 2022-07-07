import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BpcComponent } from './components/bpc/bpc.component';
import { OtrosEntesComponent } from './components/otros-entes/otros-entes.component';
import { AgregarEnteComponent } from './components/agregar-ente/agregar-ente.component';
import { UpdateBPCComponent } from './components/update-bpc/update-bpc.component';
import { UpdateValoresBpcComponent } from './components/update-valores-bpc/update-valores-bpc.component';
import { HomeAbmEntesComponent } from './components/home-abm-entes/home-abm-entes.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'bpc', component: BpcComponent },
  { path:'otros-entes', component: OtrosEntesComponent },
  { path:'agregar-entes', component: AgregarEnteComponent },
  { path:'update-bpc', component: UpdateBPCComponent },
  { path:'home-abm-entes', component: HomeAbmEntesComponent },
  { path:'update-valores-bpc/:origen/:campo', component: UpdateValoresBpcComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes, {useHash: true})]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
