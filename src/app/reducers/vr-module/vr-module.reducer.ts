import { ActionReducer, Action } from '@ngrx/store';
import { IVrModule } from '../../interfaces';
import * as _ from 'lodash';

const VR_MODULE_REMOVED = 'VR_MODULE_REMOVED';
const VR_MODULE_ADDED = 'VR_MODULE_ADDED';

const initialState: IVrModule[] = [];

const vrModuleReducer: ActionReducer<IVrModule[]> = (state: IVrModule[] =
                                                    initialState, action: Action) => {
  switch (action.type) {
    case VR_MODULE_REMOVED:
      _.remove(state, mod => mod.id === action.payload.id);
      return state;
    case VR_MODULE_ADDED:
      state = _.concat(state, action.payload);
      return state;
    default:
      return state;
  }
};

export {
  VR_MODULE_REMOVED,
  VR_MODULE_ADDED,
  vrModuleReducer
}
