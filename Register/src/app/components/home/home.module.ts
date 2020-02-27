import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
//material
import {MatCardModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatInputModule, MatCheckboxModule, MatButtonModule} from '@angular/material'
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
//chart
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    //material
    MatCardModule, 
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTableModule,    
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    //chart
    ChartsModule,
  ],
  providers: [DatePipe],
})
export class HomeModule { }
