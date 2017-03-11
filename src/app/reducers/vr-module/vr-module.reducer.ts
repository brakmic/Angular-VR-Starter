import { ActionReducer, Action } from '@ngrx/store';
import { IVrModule } from 'app/interfaces';
import * as _ from 'lodash';

const VR_MODULE_REMOVED = 'VR_MODULE_REMOVED';
const VR_MODULE_ADDED = 'VR_MODULE_ADDED';

const initialState: IVrModule[] = [];
/**
 * VR Module reducer
 */
const vrModuleReducer: ActionReducer<IVrModule[]> = (state: IVrModule[] =
                                                    initialState, action: Action) => {
  switch (action.type) {
    case VR_MODULE_REMOVED:
      return _.filter(state, (mod) => mod.id === action.payload.id);
    case VR_MODULE_ADDED:
      return _.concat(state, action.payload);
    default:
      return state;
  }
};

export {
  VR_MODULE_REMOVED,
  VR_MODULE_ADDED,
  vrModuleReducer
}
