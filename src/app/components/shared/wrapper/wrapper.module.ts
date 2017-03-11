import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VrWrapperComponent } from './wrapper.component';
import { VrElementModule } from '../vr-element';
import { WRAPPER_ROUTES } from './wrapper.routes';
import { LogService } from 'app/services';

export const routes: Routes = WRAPPER_ROUTES;

@NgModule({
    imports: [ CommonModule,
               VrElementModule,
               RouterModule.forChild(routes),
    ],
    exports: [ VrWrapperComponent ],
    declarations: [ VrWrapperComponent ]
})
export class VrWrapperModule {
    public static routes = routes;
    constructor(private logService: LogService){
    }
 }
