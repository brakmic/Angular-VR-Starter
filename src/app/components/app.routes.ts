import { STAGE_ROUTES } from './shared';
import { provideRouter, RouterConfig } from '@angular/router';

export {
  STAGE_ROUTES
}

export const APP_ROUTER_PROVIDERS = [provideRouter(STAGE_ROUTES, { enableTracing: false })];
