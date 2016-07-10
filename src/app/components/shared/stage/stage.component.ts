/**
 * This component is responsible for setting up `the stage` where all available modules
 * and other visible components will live.
 * @type {Component}
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, ROUTER_DIRECTIVES } from '@angular/router';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
// VR Module
import { VrModule } from '../modules';
// State Management with Redux
import '@ngrx/core/add/operator/select';
import * as _ from 'lodash';

const template = require('./stage.component.html');
const style = require('./stage.component.scss');
const domready = require('domready');

@Component({
  moduleId: module.id,
  selector: 'vr-stage',
  template: template,
  styles: [style],
  directives: [ROUTER_DIRECTIVES, VrModule],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stage {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {


  }
  public ngOnInit() {

  }
  public ngOnDestroy() {
  }
  public ngOnChanges(changes: any) {

  }

  public ngDoCheck() {
  }
}
