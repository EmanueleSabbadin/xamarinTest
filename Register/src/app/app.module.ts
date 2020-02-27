import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//material 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material'
import {MatMenuModule,MatCardModule, MatButtonModule} from '@angular/material'
import {MatSidenavModule} from '@angular/material';
import {MatDialogModule} from "@angular/material";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InterceptorService } from './services/auth/interceptor.service';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //material
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule, 
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ,InterceptorService,{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
