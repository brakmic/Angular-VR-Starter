/**
 * These are globally available directives in any template
 */

import { PLATFORM_DIRECTIVES } from '@angular/core';
// Angular 2 forms
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

// Angular 2 Router
import { ROUTER_DIRECTIVES } from '@angular/router';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...REACTIVE_FORM_DIRECTIVES,
  ...ROUTER_DIRECTIVES
];

export const DIRECTIVES = [
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
