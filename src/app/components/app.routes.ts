import { Wrapper } from './shared';
import { provideRouter, RouterConfig } from '@angular/router';
/**
 * All routes go towards Wrapper that prepares the stage for vr modules
 * to be loaded. With route we provide also an ID of the selected module. 
 * Check wrapper/wrapper.component.ts for more info on URL parameter handling.
 */
const ALL_ROUTES: RouterConfig = [
  { path: '',
        children: [
          { path: '', component: Wrapper },
          { path: ':area', component: Wrapper }
        ]
  }
];

export const VR_ROUTER_PROVIDERS = [provideRouter(ALL_ROUTES, { enableTracing: false })];
