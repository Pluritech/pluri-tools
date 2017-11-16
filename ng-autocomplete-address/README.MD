# Directive to autocomplete address using Google API

## Installation

To install:

```bash
$ npm install @pluritech/ng-autocomplete-address --save
```

## Include script maps.googleapis.com
```xml
  <!-- index.html -->
<script src="https://maps.googleapis.com/maps/api/js?v=3&libraries=places"></script>

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng-autocomplete-address
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the Module
import { AutoCompleteAddressModule } from '@pluritech/ng-autocomplete-address';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AutoCompleteAddressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<input autoCompleteAddress >  </input>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Lucas Correa](mailto:lucasccorrea@gmail.com)
