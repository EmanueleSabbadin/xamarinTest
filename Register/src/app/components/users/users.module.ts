import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent, UserDialog } from './users.component';
//material
import {MatCardModule, MatSelectModule, MatSnackBarModule, MatStepperModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule,MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [UsersComponent, UserDialog],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    MatSnackBarModule,
    MatStepperModule,
  ],
  entryComponents:[UserDialog]
})
export class UsersModule { }
