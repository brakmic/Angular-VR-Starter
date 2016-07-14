/*
 * Default Angular providers
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
// // Redux Store
import { appStore } from './app/stores';
/*
* Platform and Environment providers/directives/pipes
*/
import { BROWSER_PROVIDERS } from './platform/browser';

import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
import { App,
         VR_COMPONENTS,
         VR_ROUTER_PROVIDERS,
         VR_DIRECTIVES,
         VR_PROVIDERS } from './app';

/***********************************************************************
 * Bootstrap Angular app and inject
 * Services, Providers & Pipes into Angular's Dependency Injection
 */
export function main(initialHmrState?: any): Promise<any> {

      return bootstrap(App, [
      ...BROWSER_PROVIDERS,
      ...ENV_PROVIDERS,
      ...VR_PROVIDERS,
      ...VR_COMPONENTS,
      ...VR_DIRECTIVES,
      ...VR_ROUTER_PROVIDERS,
      appStore
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
