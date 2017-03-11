import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { APP_ROUTES, PreloadSelectedModulesStrategy } from './app.routes';
import { AppState, LogService, VrModuleService } from 'app/services';
import { appStore } from 'app/stores';
import { StoreType } from 'app/types';
import { TaskHelper } from 'app/helpers';
import { VrWrapperModule, VrListModule } from './shared';

const ENV_PROVIDERS = [
    PreloadSelectedModulesStrategy
];

const APP_PROVIDERS = [
    appStore,
    AppState,
    LogService,
    VrModuleService,
    TaskHelper
];

const APP_MODULES = [
    VrListModule,
    VrWrapperModule
];

@NgModule({
    providers: [ ...ENV_PROVIDERS,
                 ...APP_PROVIDERS ],
    imports: [ CommonModule,
               BrowserModule,
               ...APP_MODULES,
               RouterModule.forRoot(APP_ROUTES,
                                    {
                              useHash: false,
                              enableTracing: true,
                              errorHandler: (error) => console.log(`[ROUTER ERROR] : ${error}`),
                              preloadingStrategy: PreloadAllModules
                            }),
             ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef,
              public appState: AppState,
              public logService: LogService) {}
  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    this.logService.logEx(`HMR Store: ${JSON.stringify(store, null, 2)}`, 'AppModule');
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
