import { Component, Directive,
         ElementRef,
         Input, OnChanges,
         SimpleChange,
         DoCheck, OnInit, OnDestroy,
         AfterContentChecked, provide,
         ChangeDetectionStrategy, ChangeDetectorRef,
         ViewChild, ViewContainerRef,
         ComponentResolver, ComponentMetadata,
         ComponentFactory, ReflectiveInjector, Injector } from '@angular/core';
// Routing
import { ActivatedRoute, Route,
         Router, ROUTER_DIRECTIVES } from '@angular/router';
// RxJS (currently unused!)
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
// VR Module 
import { VrModule } from '../directives';
// Services 
import { LogService, VrModuleService } from '../../../services';
// Interfaces 
import { IAppState, IVrModule, IVrModuleDescriptor } from '../../../interfaces';
import * as _ from 'lodash';
// State Management with Redux
import '@ngrx/core/add/operator/select';
import { Store } from '@ngrx/store';
const template = require('./wrapper.component.html');
const style = require('./wrapper.component.scss');

@Component({
  selector: 'vr-wrapper',
  template: template,
  directives: [VrModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Wrapper {
  private src: string;
  private modules: Observable<IVrModule[]>;
  private availableModules: IVrModule[] = [];
  private vrScripts: string[] = [];
  private routeSubscription: Subscription;
  private modulesSubscription: Subscription;
  /**
   * Creates an instance of Wrapper.
   * This component is responsible for setting up the stage for vr modules.
   * 
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {ViewContainerRef} viewContainerRef
   * @param {ComponentResolver} componentResolver
   * @param {Injector} injector
   * @param {LogService} logService
   * @param {VrModuleService} vrModuleService
   * @param {Store<IAppState>} store
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private logService: LogService,
              private store: Store<IAppState>) {
  }
  public ngOnInit() {
    this.initSubscriptions();
  }
  public ngAfterViewInit() {
  }
  public ngOnDestroy() {
    this.destroySubscriptions();
  }
  public ngOnChanges(changes: any) {
  }
  private initSubscriptions() {
   this.modules = <Observable<IVrModule[]>>this.store.select('vrModule');
   // retrieve the current app state regarding available vr modules
   this.modulesSubscription = this.modules.subscribe(mods => {
     this.availableModules = mods;
   });
   // Each time the route changes take the ID and instantiate the appropriate
   // vr module.
   // If the module contains a script-array load them too.
   // Check shared/directives/vr-module.directive.ts for more info regarding 
   // dynamic instantiation of vr modules.
   this.routeSubscription = this.route.params.subscribe(params => {
      const id = params['id'];
      const mod = _.find(this.availableModules, _mod => _mod.id === id);
      this.src = mod ? mod.markup : undefined;
      this.vrScripts = mod ? mod.scripts : [];
      this.changeDetectorRef.markForCheck();
    });
  }
  private destroySubscriptions() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.modulesSubscription) {
      this.modulesSubscription.unsubscribe();
    }
  }
}
