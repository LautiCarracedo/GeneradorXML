import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BpcComponent } from './components/bpc/bpc.component';
import { OtrosEntesComponent } from './components/otros-entes/otros-entes.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'bpc', component: BpcComponent },
  { path:'otros-entes', component: OtrosEntesComponent }
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
