import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MatTreeModule, MatIconModule, MatButtonModule,MatFormFieldModule,MatInputModule} from '@angular/material'

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
import { FormsellerComponent, RoundPipe } from './formseller/formseller.component';
import {MatRadioModule} from '@angular/material/radio';
import { MysalesComponent } from './mysales/mysales.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';




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
    MatFormFieldModule,
    MatTooltipModule,
    HttpClientModule,
    ModalModule,
    MatInputModule,
    MatRadioModule,
    
    AgmCoreModule.forRoot({
      apiKey :'AIzaSyCz0yBwsE4LTeraEFSZA_8vsta9xPhN6Dc',
      libraries :['places']
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GestionsellerComponent,
    FormsellerComponent,
    RoundPipe,
    MysalesComponent,
    MaintenanceComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
