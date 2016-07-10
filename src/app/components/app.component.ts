import { Component, AfterViewInit,
         OnChanges, OnInit, Output,
         EventEmitter, provide, OpaqueToken,
         ChangeDetectionStrategy, ChangeDetectorRef,
         OnDestroy } from '@angular/core';

import { ActivatedRoute, Router,
         ROUTER_DIRECTIVES } from '@angular/router';

import { Stage } from './shared';

// State Management with Redux
import '@ngrx/core/add/operator/select';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

const template = require('./app.component.html');
const normalize = require('normalize.css');
const style = require('./app.component.scss');

@Component({
  moduleId: module.id,
  selector: 'vr-app',
  template: template,
  styles: [normalize, style],
  directives: [...ROUTER_DIRECTIVES],
  precompile: [Stage]
})
export class App implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  /**
   * App constructor
   * @param {Router}         private router     Default router
   * @param {ActivatedRoute} private route      Current route
   * @param {LogService}     private logService Logging service
   */
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public ngAfterViewInit() {
  }

  public ngOnChanges(changes: any) {
  }
}
