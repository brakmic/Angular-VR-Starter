import { Component, Directive,
         ElementRef,
         Input, OnChanges,
         SimpleChange,
         DoCheck, OnInit, OnDestroy,
         AfterContentChecked, provide,
         ChangeDetectionStrategy, ChangeDetectorRef,
         ViewChild, ViewContainerRef,
         ComponentResolver, ComponentMetadata,
         ComponentFactory, ReflectiveInjector } from '@angular/core';
// Routing
import { ActivatedRoute, Route,
         Router, ROUTER_DIRECTIVES } from '@angular/router';
// RxJS (currently unused!)
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

const template = require('./vr-module.component.html');

@Directive({
  selector: 'vr-module'
})
export class VrModule {
  // the HTML can be provided via `src` property
  @Input() private src: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              private componentResolver: ComponentResolver) {
  }
  public ngAfterViewInit() {
  }
  public ngOnInit() {
    this.setupScene();
  }
  public ngOnDestroy() {

  }
  public ngOnChanges(changes: any) {
    // alternatively one could provide different templates via src-property 
    // ----------------------------------------------------------------------

    // if (!this.src) return;
    // const metadata = new ComponentMetadata({
    //     selector: 'dynamic-html',
    //     template: this.src,
    // });
    // this.createComponentFactory(this.componentResolver, metadata)
    //   .then(factory => {
    //     const injector = ReflectiveInjector.fromResolvedProviders([], 
    //                                       this.viewContainerRef.parentInjector);
    //     this.viewContainerRef.createComponent(factory, 0, injector, []);
    //   });

  }
  private setupScene() {
    const metadata = new ComponentMetadata({
        selector: 'dynamic-html',
        template: template
    });
    this.createComponentFactory(this.componentResolver, metadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([],
                                          this.viewContainerRef.parentInjector);
        this.viewContainerRef.createComponent(factory, 0, injector, []);
      });
  }
  private createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata):
                                                                Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
  }
}
