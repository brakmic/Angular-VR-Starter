import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrElementDirective } from './vr-element.directive';

@NgModule({
    imports: [ CommonModule ],
    exports: [ VrElementDirective ],
    declarations: [ VrElementDirective ]
})
export class VrElementModule { }
