import { Component, AfterViewInit,
         OnChanges, OnInit, Output,
         EventEmitter, OpaqueToken,
         ChangeDetectionStrategy, ChangeDetectorRef,
         OnDestroy, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { predefinedModules } from './app.loader';
// Interfaces
import { IAppState, IVrModule, ITask } from 'app/interfaces';
// Enums 
import { VrModuleType } from 'app/enums';
// State Management with Redux
import '@ngrx/core/add/operator/select';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// Services 
import { LogService, VrModuleService } from 'app/services';
// Helpers 
import { TaskHelper } from 'app/helpers';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { VR_MODULE_ADDED, VR_MODULE_REMOVED } from 'app/reducers';

@Component({
  selector: 'vr-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit,
                            OnDestroy,
                            OnChanges,
                            AfterViewInit {
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
   * @param {ChangeDetectorRef} cd
   * @param {LogService} logService
   * @param {VrModuleService} vrModuleService
   * @param {Store<IAppState>} store
   * @param {TaskHelper} taskHelper
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
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
    this.availableModules = <Observable<IVrModule[]>> this.store.select('vrModule');
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
    this.routeSubscription = this.route.params.subscribe((data) => {
      this.logService.logJson(data, 'App');
    });
    this.moduleSubscription = this.vrModuleService.registerModule().subscribe((message) => {
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
    _.each(modules, (mod) => this.vrModuleService.next(mod));
  }
}
