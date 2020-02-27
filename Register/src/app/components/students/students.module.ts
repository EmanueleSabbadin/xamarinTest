import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent, DialogOverviewExampleDialog } from './students.component';
//material
import {MatCardModule, MatListModule, MatDividerModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatCheckboxModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule,MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list'


@NgModule({
  declarations: [StudentsComponent, DialogOverviewExampleDialog ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
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
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
  entryComponents:[DialogOverviewExampleDialog],
  providers: [DatePipe],
})
export class StudentsModule { }
