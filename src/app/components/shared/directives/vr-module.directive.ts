import { Component, Directive,
         ElementRef,
         Input, OnChanges,
         SimpleChange,
         DoCheck, OnInit, OnDestroy,
         AfterViewInit, provide,
         ChangeDetectionStrategy, ChangeDetectorRef,
         ViewChild, ViewContainerRef, TemplateRef,
         ComponentResolver, ComponentMetadata,
         ComponentFactory, ReflectiveInjector } from '@angular/core';

// Services 
import { LogService } from '../../../services';
import * as _ from 'lodash';

@Directive({
  selector: 'vr-module'
})
export class VrModule {
  @Input() public html: string;
  @Input() public scripts: string[] = [];
  private activeScripts: HTMLScriptElement[] = [];
  private vrScriptPrefix = 'vrscript_';
  /**
   * Creates an instance of VrModule.
   * This directive uses the markup and optional scripts provided by the 
   * Wrapper component to instantiate a vr module.
   * 
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {ViewContainerRef} viewContainerRef
   * @param {ComponentResolver} componentResolver
   * @param {LogService} logService
   */
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              private componentResolver: ComponentResolver,
              private logService: LogService) {
  }

  public ngOnInit() {
  }
  public ngAfterViewInit() {
    this.logService.logEx('Init', 'VrModuleDirective');
  }
  public ngOnDestroy() {

  }
  /**
   * Check for changes (htmp/script attributes)
   * 
   * @param {*} changes
   */
  public ngOnChanges(changes: any) {
    if (!_.isNil(changes) &&
       !_.isNil(changes.html.currentValue) &&
       !_.isEqual(changes.html.currentValue, changes.html.previousValue)) {
         // if the markup has changed remove the existing vr-module scripts first
         Promise.resolve(_.each(this.activeScripts, (script, index) => {
           const body = document.getElementsByTagName('body')[0];
           const oldNode = body.removeChild(document.getElementById(this.vrScriptPrefix + index));
         })).then(() => {
            // clean up the view-container reference...
            this.activeScripts = [];
            this.viewContainerRef.clear();
            // and setup a new scene
            this.setupScene();
          });
       }
  }
  /**
   * Creates a new vr scene by using Angular's dynamic component loading
   * mechanism.
   * 
   * @private
   */
  private setupScene() {
    const metadata = new ComponentMetadata({
        selector: 'vr-module',
        template: this.html
    });
    // create a new component
    this.createComponentFactory(this.componentResolver, metadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([],
                                           this.viewContainerRef.parentInjector);
        this.viewContainerRef.createComponent(factory, 0, injector, []);
      })
      // add vr scene-dependent scripts, if any
      .then(() => {
        const hostEl = document.getElementsByTagName('body')[0];
        _.each(this.scripts, (script, idx) => this.appendScript(hostEl, script, idx));
      });
  }
  /**
   * Dynamically append a vr-module script 
   * 
   * @private
   * @param {HTMLElement} host
   * @param {string} data
   * @param {number} index
   */
  private appendScript(host: HTMLElement, data: string, index: number) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.id = this.vrScriptPrefix + index;
    script.defer = true;
    script.async = true;
    script.text = data;
    host.appendChild(script);
    this.activeScripts.push(script); // memorize the script so we can remove it later
  }
  /**
   * Create an Angular2-based component factory. This is needed to create new 
   * component instances. 
   * 
   * @private
   * @param {ComponentResolver} resolver
   * @param {ComponentMetadata} metadata
   * @returns {Promise<ComponentFactory<any>>}
   */
  private createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata):
                                                                Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
  }
}
