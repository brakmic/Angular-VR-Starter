import { Component, Directive,
         NgModule, Input,
         OnChanges, SimpleChange,
         SimpleChanges, OnInit,
         OnDestroy, ChangeDetectionStrategy,
         ChangeDetectorRef, ViewContainerRef,
         Compiler, ComponentRef,
         NgZone, ReflectiveInjector } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { createComponentFactory } from 'app/helpers';

import { IAppState, IDynamicComponent } from 'app/interfaces';
// Services 
import { LogService } from 'app/services';
import * as _ from 'lodash';

@Directive(
{ 
  selector: 'vr-element' 
})
export class VrElementDirective implements OnChanges,
                                  OnDestroy {
  @Input() public dynamicComponent: IDynamicComponent;
  public cmpRef: ComponentRef<any>;
  private activeScripts: HTMLScriptElement[] = [];
  private vrScriptPrefix = 'vrscript_';

  constructor(private vcRef: ViewContainerRef,
              private compiler: Compiler,
              private ngZone: NgZone) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (!_.isNil(changes) &&
        !_.isNil(this.dynamicComponent)) {
         const cmp = this.dynamicComponent;
         if (this.cmpRef) {
            this.cmpRef.destroy();
         }
         const body = document.getElementsByTagName('body')[0];
         // if the markup has changed remove the existing vr-module scripts first
         Promise.resolve(_.each(this.activeScripts, (script, index) => {
           const oldNode = body.removeChild(document.getElementById(this.vrScriptPrefix + index));
         })).then(() => {
            // clean up the view-container reference...
            this.activeScripts = [];
            _.each(cmp.scripts, (script, idx) => {
                  this.appendScript(body, script, Number(idx))
            });
         });
         const metadata = new Component({
            selector: 'vr-dynamic-element',
            template: cmp.html,
         });
         createComponentFactory(this.compiler, metadata).then((factory) => {
            const injector = ReflectiveInjector.fromResolvedProviders([],
                                                    this.vcRef.parentInjector);
            this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
         });
    }
  }
  
  public ngOnDestroy() {
    if (!_.isNil(this.cmpRef)) {
      this.cmpRef.destroy();
    }
  }

  private appendScript(host: HTMLElement, data: string, index: number) {
    this.ngZone.runOutsideAngular(() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.id = this.vrScriptPrefix + index;
      script.defer = true;
      script.async = true;
      script.text = data;
      host.appendChild(script);
      // memorize the script so we can remove it later
      this.activeScripts.push(script);
    });
  }
}

