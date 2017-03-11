import { Component, Directive,
         NgModule,
         ModuleWithComponentFactories,
         Compiler, ComponentFactory,
         CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }  from '@angular/common';

export function createComponentFactory(compiler: Compiler,
                                       metadata: Component):
                                              Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ 
        imports: [ CommonModule ], 
        declarations: [decoratedCmp],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ] })
    class DynamicHtmlModule { }

    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
       .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => 
                {
                    return moduleWithComponentFactory.componentFactories.find
                                ((x) => x.componentType === decoratedCmp);
                });
}
