import { Component, AfterViewInit,
         OnChanges, OnInit, Output, Input,
         EventEmitter, provide, OpaqueToken,
         ChangeDetectionStrategy, ChangeDetectorRef,
         OnDestroy } from '@angular/core';
// VR Module Interfaces
import { IVrModule } from '../../../interfaces';
// Services
import { LogService } from '../../../services';
import * as _ from 'lodash';
const template = require('./list.component.html');
const style = require('./list.component.scss');
const domready = require('domready');

@Component({
  selector: 'vr-list',
  template: template,
  styles: [style]
})
export class VrList implements OnInit {
  @Input() public modules: IVrModule[];
  @Output() public vrModuleSelected = new EventEmitter(true);
  private hammerElements: HammerManager[] = [];
  /**
   * Creates an instance of VrList.
   * Shows a list of available vr modules.
   * It also creates HammerJS-based event handlers for better experience
   * on tablets and other mobile devices.
   *
   * @param {LogService} logService
   */
  constructor(private logService: LogService) {
  }

  public ngOnInit() {
    this.logService.logEx(`Init`, 'List');
  }

  public ngOnDestroy() {
    this.hammerElements.forEach(m => m.off('tap press'));
    this.hammerElements = [];
  }

  public ngAfterViewInit() {
  }

  public ngOnChanges(changes: any) {
    if (!_.isNil(this.modules) &&
        !_.isNil(changes) &&
        !_.isEqual(changes.modules.previousValue,
                   changes.modules.currentValue)) {
          this.updateEventHandlers();
    }
  }

  private entryClicked(data: any) {
    this.vrModuleSelected.emit(data);
  }
  /**
   * Remove any zombie event handlers and instantiate new ones (HammerJS)
   *
   * @private
   */
  private updateEventHandlers() {
    domready(() => {
      this.hammerElements.forEach(m => m.off('tap press'));
      this.hammerElements = [];
      this.modules.forEach(m => {
        const elem = document.getElementById(m.name);
        if (!_.isNil(elem)) {
          const entry = new Hammer(elem);
          this.hammerElements.push(entry);
          entry.on('tap press', ev => {
            let name = ev.target.textContent;
            let item = ev.target;
            this.entryClicked({ sender: 'List',
                                    module: m,
                                    item: item,
                                    original: ev
                                  });
          });
        }
      });
    });
  }
}
