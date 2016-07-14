// Base
export * from './components';
export * from './interfaces';
export * from './services';
export * from './helpers';

import { Wrapper,
         VrList, VrModule } from './components';
import { LogService, VrModuleService } from './services';
import { TaskHelper } from './helpers';

export const VR_PROVIDERS = [
  LogService,
  VrModuleService,
  TaskHelper
];

export const VR_COMPONENTS = [
  Wrapper,
  VrList
];

export const VR_DIRECTIVES = [
  VrModule
];
