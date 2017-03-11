/**
 * Provides vr-module loading services. // !!UNUSED!!
 * @type {Injectable}
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
// VR Module Interfaces
import { VrModuleType } from 'app/enums';
import { IAppState, IVrModule,
         IVrModuleDescriptor, IServiceMessage } from 'app/interfaces';
import { VR_MODULE_ADDED, VR_MODULE_REMOVED } from 'app/reducers';
import { LogService } from 'app/services';
import * as _ from 'lodash';
/**
 * Service for managing vr modules 
 * 
 * @export
 * @class VrModuleService
 * @extends {Subject<IVrModule>}
 */
@Injectable()
export class VrModuleService extends Subject<IVrModule> {

  constructor(private store: Store<IAppState>,
              private logService: LogService) {
    super();
  }
  /**
   * Registers a vr module
   * @return {Observable<IServiceMessage>} Observable stream of IServiceMessage instances
   */
    public registerModule(): Observable<IServiceMessage> {
      return this.asObservable().map((mod) => {
        if (!_.isNil(mod) &&
            !_.isNil(mod.id) &&
            !_.isNil(mod.name)) {
            this.store.dispatch( { type: VR_MODULE_ADDED, payload: mod });
            return <IServiceMessage> {
              id: '0000',
              content: `Registered vr module '${mod.name}'`
            };
          }
          return <IServiceMessage>{
            id: '000',
            content: mod ? `Could not register vr module '${mod.id}'` :
                           `Could not register unknown vr module`
          };
      });
    }
    /**
     * Unregisters a vr module
     * 
     * @returns {Observable<IServiceMessage>} Observable stream of IServiceMessage instances
     */
    public unregisterModule(): Observable<IServiceMessage> {
      return this.asObservable().map((mod) => {
        if (!_.isNil(mod) &&
            !_.isNil(mod.id)) {
            this.store.dispatch( { type: VR_MODULE_REMOVED, payload: mod });
            return <IServiceMessage> {
              id: '0000',
              content: `Unregistered vr module '${mod.name}'`
            };
          }
          return <IServiceMessage>{
            id: '000',
            content: mod ? `Could not unregister vr module '${mod.id}'` :
                           `Could not unregister unknown vr module`
          };
      });
    }
}



