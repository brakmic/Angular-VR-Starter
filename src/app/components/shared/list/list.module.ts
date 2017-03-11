import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrListComponent } from './list.component';

@NgModule({
    imports: [ CommonModule ],
    exports: [ VrListComponent ],
    declarations: [ VrListComponent ]
})
export class VrListModule { }