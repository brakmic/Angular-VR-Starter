// Polyfills
// ----------

// CoreJS
import 'core-js/es6';
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/weak-set';
// import 'core-js/es6/typed';
// import 'core-js/es6/promise';
// import 'core-js/es6/reflect';
import 'core-js/es7';


require('zone.js/dist/zone');

// require('script!../node_modules/typescript/lib/typescript.js');

// require('script!platform/polyfills/es6-module-loader-dev.src.js');

// Typescript emit helpers polyfill
import 'ts-helpers';


// Apple Safari `requestAnimationFrame` polyfills
require('request-frame')('native');

// DOM4 Polyfills for IE
require('script!platform/polyfills/dom4');

if ('production' === ENV) {
  // Production

} else {
  // Development
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');

}
