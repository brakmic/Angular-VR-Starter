// Vendor scripts go here
// -----------------------

require('script!vendor/jquery-2.1.4.js');

// CryptoJS
// require('script!vendor/cryptojs/rollups/sha512.js');

// RxJS
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/observable/fromPromise';

// Immutable
// import 'immutable';

// Hammjer.js
import 'hammerjs';

// Lodash
import * as _ from 'lodash';
// Themes
import 'bootstrap-loader';
import 'font-awesome-sass-loader';

// Prevent Ghost Clicks (for Hammer.js)
import './platform/helpers/browser-events';

// Circular JSON (for better serializing of complex objects)
import 'circular-json';

if ('production' === ENV) {
  // Production

} else {
  // Development
}
