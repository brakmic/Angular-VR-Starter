import {
  Component, Directive,
  OnChanges,
  SimpleChange, AfterViewInit,
  OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
// Routing
import { ActivatedRoute, Route, Router } from '@angular/router';
// RxJS (currently unused!)
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// Services 
import { LogService, VrModuleService } from 'app/services';
// Interfaces 
import { IAppState, IVrModule, IVrModuleDescriptor } from 'app/interfaces';
import * as _ from 'lodash';
// State Management with Redux
import '@ngrx/core/add/operator/select';
import { Store } from '@ngrx/store';

@Component({
  selector: 'vr-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: [
    './wrapper.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class VrWrapperComponent implements OnInit,
                                           OnDestroy,
                                           OnChanges,
                                           AfterViewInit {
  public dynamicComponent: any = undefined;
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
   * @param {LogService} logService
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
  public onDynamicEvent($event: any) {
    this.logService.logJson($event);  
  }
  private initSubscriptions() {
    this.modules = <Observable<IVrModule[]>>this.store.select('vrModule');
    // retrieve the current app state regarding available vr modules
    this.modulesSubscription = this.modules.subscribe((mods) => {
      this.availableModules = mods;
    });
    // Each time the route changes take the ID and instantiate the appropriate
    // vr element.
    // If the element contains a script-array load them too.
    // Check shared/directives/vr-element.directive.ts for more info regarding 
    // dynamic instantiation of vr elements.
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      const mod = _.find(this.availableModules, (m) => m.id === id);
      if (!_.isNil(mod)) {
        this.dynamicComponent = {
          html: mod ? mod.markup : undefined,
          scripts: mod ? mod.scripts : []
        };
        this.changeDetectorRef.markForCheck();
      }
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
