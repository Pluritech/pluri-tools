import { Location } from './location.model';

export class GmapsUtils {

  public geocoder: google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  public addressByPlaceId(placeId: string): Promise<Location> {
    return this._execGeoCode({placeId: placeId})
      .then(results => this.buildAddress(results[0]))
      .catch(error => { throw {status: error, method: 'addressByPlaceId'} });
  }

  public addressByLatLng(lat: number, lng: number): Promise<Location> {
    const pos = new google.maps.LatLng(lat, lng);
    return this._execGeoCode({location: pos})
      .then(results => this.buildAddress(results[0]))
      .catch(error => { throw {status: error, method: 'addressByLatLng'} });
  }

  public buildAddress(result: google.maps.GeocoderResult): Location {
    const keyComponents = this._transformKeyComponents(result.address_components);
    const city = keyComponents['locality'] || keyComponents['administrative_area_level_2'];
    return {
      state: this._getValue(keyComponents.administrative_area_level_1, 'shortName'),
      street: this._getValue(keyComponents.route, 'shortName'),
      number: this._getValue(keyComponents.street_number, 'shortName'),
      city: this._getValue(city, 'longName'),
      zipcode: this._getValue(keyComponents.postal_code, 'longName'),
      political: this._getValue(keyComponents.political, 'longName'),
      country: this._getValue(keyComponents.country, 'longName'),
      formattedAddress: result.formatted_address || '',
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    };
  }

  private _getValue(value: any, type: string) {
    return value ? value[type] : '';
  }

  private _transformKeyComponents(addressComponents: google.maps.GeocoderAddressComponent[]): any {
    const keyComponents: any = {};
    addressComponents.forEach(c => {
      keyComponents[c.types[0]] = {
        longName: c.long_name,
        shortName: c.short_name
      }
    });
    return keyComponents;
  }

  private _execGeoCode(params: google.maps.GeocoderRequest): Promise<google.maps.GeocoderResult[]> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(params, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK)
          resolve(results);
        reject(status);
      });
    });
  }

}
