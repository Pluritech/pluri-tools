import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteAddressDirective } from './autocomplete-address.directive';

export * from './autocomplete-address.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutoCompleteAddressDirective
  ],
  exports: [
    AutoCompleteAddressDirective
  ]
})
export class AutoCompleteAddressModule { }
