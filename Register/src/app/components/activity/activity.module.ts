import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent, ActivityDialog } from './activity.component';
import {DatePipe} from '@angular/common'
//material
import {MatCardModule, MatSnackBarModule, MatStepperModule, MatCheckboxModule, MatSelectModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule,MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule, MatNativeDateModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [ActivityComponent, ActivityDialog],
  imports: [
    CommonModule,
    ActivityRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  entryComponents:[ActivityDialog],
  providers: [DatePipe],
})
export class ActivityModule { }
