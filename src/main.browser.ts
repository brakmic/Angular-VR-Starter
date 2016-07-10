/*
 * Default Angular providers
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
// // Redux Store
// import { appStore } from './app/stores';
/*
* Platform and Environment providers/directives/pipes
*/
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';

import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
import { App, APP_COMPONENTS, APP_ROUTER_PROVIDERS } from './app';

/***********************************************************************
 * Bootstrap Angular app and inject
 * Services, Providers & Pipes into Angular's Dependency Injection
 */
export function main(initialHmrState?: any): Promise<any> {

      return bootstrap(App, [
      ...APP_COMPONENTS,
      ...ENV_PROVIDERS,
      ...DIRECTIVES,
      ...PIPES,
      ...PROVIDERS,
      ...APP_ROUTER_PROVIDERS
    ])
    .then(decorateComponentRef)
    .catch(err => console.error(err));
}

/*
 * Hot Module Reload
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
