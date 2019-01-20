import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomControlComponent, SELECTION_MODEL_FACTORY } from './components/custom-control/custom-control.component';
import { CustomDropdownComponent } from './components/custom-control/custom-dropdown.component';
import { DefaultSelectionModelFactory } from './components/custom-control/selection.model';

@NgModule({
  declarations: [
    AppComponent,
    CustomControlComponent,
    CustomDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
