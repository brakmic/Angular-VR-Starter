/**
 * This component is responsible for setting up `the stage` where all available modules
 * and other visible components will live.
 * @type {Component}
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Route,
         Router, ROUTER_DIRECTIVES } from '@angular/router';
// RxJS (not in use!)
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
// VR Module
import { VrModule } from '../modules';
// State Management with Redux (not in use!)
import '@ngrx/core/add/operator/select';

const template = require('./stage.component.html');
const style = require('./stage.component.scss');

@Component({
  moduleId: module.id,
  selector: 'vr-stage',
  template: template,
  styles: [style],
  directives: [ROUTER_DIRECTIVES, VrModule]
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
