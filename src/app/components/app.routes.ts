// Components 
import { Stage, STAGE_ROUTES, SimpleModule } from './shared';
// Router Provider
import { provideRouter, RouterConfig } from '@angular/router';


export {
  STAGE_ROUTES
}


export const APP_ROUTER_PROVIDERS = [provideRouter(STAGE_ROUTES, { enableTracing: false })];
