import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionsellerComponent } from './gestionseller/gestionseller.component';

const routes: Routes =[
  {path: 'gestion', component: GestionsellerComponent } ,
   {path: 'login', component: LoginComponent } ,
   { path: '',redirectTo: 'login',pathMatch: 'full',},
   {path :'dashboard' ,component: DashboardComponent},
   
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
