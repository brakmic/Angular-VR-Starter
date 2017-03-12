/**
 * @author: @brakmic
 */
import 'aframe'; // MUST import A-Frame before zone.js!
// Polyfills
// ----------

// CoreJS
import 'core-js/es6';
import 'core-js/es7';
import 'zone.js/dist/zone';

// Apple Safari `requestAnimationFrame` polyfills
import requestFrame from '../platform/polyfills/request-frame-alt';
requestFrame('native');

if ('production' === ENV) {
  // Production

} else {
  // Development
  Error.stackTraceLimit = Infinity;
  /* tslint:disable no-var-requires */
  require('zone.js/dist/long-stack-trace-zone');

}
