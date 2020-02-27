import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

//material
import {MatCardModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule,MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatCardModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,    
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [DatePipe],
})
export class ReportModule { }
