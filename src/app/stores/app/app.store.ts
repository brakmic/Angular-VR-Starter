import { provideStore } from '@ngrx/store';
import { IAppState, IVrModule } from '../../interfaces';
import { LogService } from '../../services';
// Reducers
import { vrModuleReducer } from '../../reducers';

class AppStore implements IAppState {
  public vrModule: IVrModule;
  constructor(private logService: LogService) {
    this.logService.logEx(`Initialized`, 'AppStore');
  }
}


// Define App-Store
const appStore = provideStore(
                  {
                    vrModule: vrModuleReducer
                  },
                  {
                    vrModule: this.vrModule
                  });

export {
  appStore
}
