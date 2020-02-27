import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent, PlaceDialog } from './places.component';
//material
import {MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatTabsModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatCheckboxModule,} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlacesComponent, PlaceDialog],
  imports: [
    CommonModule,
    PlacesRoutingModule,
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
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  entryComponents:[PlaceDialog]
})
export class PlacesModule { }
