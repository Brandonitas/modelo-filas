import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { FilasComponent } from './components/filas/filas.component';
import { Mm1Component } from './components/filas/mm1/mm1.component';
import { MmsComponent } from './components/filas/mms/mms.component';
import { MmskComponent } from './components/filas/mmsk/mmsk.component';
import { Mg1Component } from './components/filas/mg1/mg1.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { 
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatOptionModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatTooltipModule,
  MatGridListModule
 } from '@angular/material';
 import {MatStepperModule} from '@angular/material/stepper';
import { RouterModule } from '@angular/router';

//Style Angular Material
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule, MatDatepickerModule, 
  MatFormFieldModule, MatRadioModule, MatSliderModule, 
  MatSlideToggleModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardsComponent,
    FilasComponent,
    Mm1Component,
    MmsComponent,
    MmskComponent,
    Mg1Component
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTableModule,
    MatAutocompleteModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatRadioModule, 
    MatSliderModule, 
    MatSlideToggleModule,
    MatSidenavModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
