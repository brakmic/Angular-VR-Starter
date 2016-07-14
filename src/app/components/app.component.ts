import { Component, AfterViewInit,
         OnChanges, OnInit, Output,
         EventEmitter, provide, OpaqueToken,
         ChangeDetectionStrategy, ChangeDetectorRef,
         OnDestroy } from '@angular/core';

import { ActivatedRoute, Router,
         ROUTER_DIRECTIVES } from '@angular/router';

import { predefinedModules } from './app.loader';
// Directives
import { VrList, VrModule,
         Wrapper } from './shared';
// Interfaces
import { IAppState, IVrModule, ITask } from '../interfaces';
// Enums 
import { VrModuleType } from '../enums';
// State Management with Redux
import '@ngrx/core/add/operator/select';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
// Services 
import { LogService, VrModuleService } from '../services';
// Helpers 
import { TaskHelper } from '../helpers';
// State Management with Redux
import '@ngrx/core/add/operator/select';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
const template = require('./app.component.html');
const normalize = require('normalize.css');
const style = require('./app.component.scss');
import { VR_MODULE_ADDED, VR_MODULE_REMOVED } from '../reducers';

@Component({
  selector: 'vr-app',
  template: template,
  styles: [normalize, style],
  directives: [...ROUTER_DIRECTIVES,
                  VrModule, VrList,
                  Wrapper],
  precompile: [VrList, Wrapper],
  changeDetection: ChangeDetectionStrategy.Default
})
export class App {
  private routeSubscription: Subscription;
  private moduleSubscription: Subscription;
  private availableModules: Observable<IVrModule[]>;
  private activeVrModule: IVrModule;
  /**
   * Creates an instance of App.
   * Initializes a few vr modules taken from `http://aframe.io` homepage
   * 
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {LogService} logService
   * @param {VrModuleService} vrModuleService
   * @param {Store<IAppState>} store
   * @param {TaskHelper} taskHelper
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private logService: LogService,
              private vrModuleService: VrModuleService,
              private store: Store<IAppState>,
              private taskHelper: TaskHelper) {
  }
  /**
   * Initialize subscriptions and get app state via @ngrx (Redux implementation Angular2)
   */
  public ngOnInit() {
    this.logService.logEx(`Init`, 'App');
    this.availableModules = <Observable<IVrModule[]>>this.store.select('vrModule');
    this.initSubscriptions();
    this.registerVrModules(predefinedModules);
  }

  public ngOnDestroy() {
    this.destroySubscriptions();
  }

  public ngAfterViewInit() {
  }

  public ngOnChanges(changes: any) {
  }

  private initSubscriptions() {
    this.routeSubscription = this.route.params.subscribe(data => {
      this.logService.logJson(data, 'App');
    });
    this.moduleSubscription = this.vrModuleService.registerModule().subscribe(message => {
      this.logService.logEx(message.content, 'App');
    });
  }

  private destroySubscriptions() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.moduleSubscription) {
      this.moduleSubscription.unsubscribe();
    }
  }
  /**
   * Click handler for vr module selections (sidebar on the left)
   * Check app.routes.ts for more info on angular2 routing
   * 
   * @private
   * @param {*} event
   */
  private onVrModuleSelected(event: any) {
    const params = {
      id: event.module.id
    };
    this.activeVrModule = event.module;
    this.router.navigate([`modules`, params], { relativeTo: this.route });
  }

  private registerVrModules(modules: IVrModule[]) {
    _.each(modules, mod => this.vrModuleService.next(mod));
  }
}
