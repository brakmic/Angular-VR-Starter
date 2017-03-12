import { Component, AfterViewInit,
         OnChanges, OnInit, Output, Input,
         EventEmitter, OpaqueToken,
         ChangeDetectionStrategy, ChangeDetectorRef,
         OnDestroy, ViewEncapsulation } from '@angular/core';
// VR Module Interfaces
import { IVrModule } from 'app/interfaces';
// Services
import { LogService } from 'app/services';
import * as _ from 'lodash';
// Hammjer.js
import 'hammerjs';
const domready = require('domready');

@Component({
  selector: 'vr-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class VrListComponent implements OnInit,
                                        OnDestroy,
                                        OnChanges,
                                        AfterViewInit {
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
      this.hammerElements.forEach((m) => m.off('tap press'));
      this.hammerElements = [];
      this.modules.forEach(m => {
        const elem = document.getElementById(m.name);
        if (!_.isNil(elem)) {
          const entry = new Hammer(elem);
          this.hammerElements.push(entry);
          entry.on('tap press', (ev) => {
            ev.preventDefault();
            let item = ev.target;
            this.entryClicked({ sender: 'List',
                                    module: m,
                                    item,
                                    original: ev
                                  });
          });
        }
      });
    });
  }
}
