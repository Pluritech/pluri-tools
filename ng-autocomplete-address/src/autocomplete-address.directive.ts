import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Directive, ElementRef, NgZone, Output, Input } from '@angular/core';

@Directive({
  selector: '[autoCompleteAddress]'
})
export class AutoCompleteAddressDirective {

  private autoCompleteService: google.maps.places.AutocompleteService;
  private inputEl: HTMLInputElement;
  @Output() predictionsSubject = new Subject<any>();
  @Input() loadingPredictions: boolean;
  @Input() boundsLatLng: google.maps.LatLngBounds;

  constructor(el: ElementRef, private ngZone: NgZone) {
    this.autoCompleteService = new google.maps.places.AutocompleteService();
    this.inputEl = el.nativeElement;
    this._registerInputEvent();
  }

  private _loadLocations(value: string): void {
    this.predictionsSubject.next([]);
    if (!value) {
      return;
    }
    this.loadingPredictions = true;
    this.ngZone.runOutsideAngular(() => this._getPlaces(value));
  }

  private _getPlaces(value: string) {
    this.autoCompleteService.getPlacePredictions(this._configAutoComplete(value), (results => {
      this.ngZone.run(() => this._handlePredictions(results));
    }));
  }

  private _handlePredictions(results) {
    this.predictionsSubject.next(results)
    this.loadingPredictions = false;
  }

  private _configAutoComplete(value: string): google.maps.places.AutocompletionRequest {
    return {
      componentRestrictions: {country: 'BR'},
      bounds: this.boundsLatLng,
      input: value,
      types: ['geocode']
    };
  }

  private _getObservableEvent(): Observable<String> {
    return Observable.fromEvent(this.inputEl, 'input')
      .map(() => {
        if (this.inputEl.firstElementChild) {
          return (<HTMLInputElement>this.inputEl.firstElementChild).value;
        }
        return this.inputEl.value;
      })
      .debounceTime(500)
      .distinctUntilChanged();
  }

  private _registerInputEvent() {
    this._getObservableEvent().subscribe((valueInput: string) => {
      this._loadLocations(valueInput);
    });
  }

}
