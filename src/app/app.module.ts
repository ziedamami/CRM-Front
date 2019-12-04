import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MatTreeModule, MatIconModule, MatButtonModule} from '@angular/material'

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import {
  AgmCoreModule
} from '@agm/core';
import { LoginComponent } from './login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GestionsellerComponent } from './gestionseller/gestionseller.component';
import { ModalModule } from './_modal';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatTooltipModule,
    HttpClientModule,
    ModalModule,
    AgmCoreModule.forRoot({
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GestionsellerComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
