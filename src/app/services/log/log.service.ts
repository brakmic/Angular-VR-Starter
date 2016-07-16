/**
 * Provides simple logging services
 * @type {Injectable}
 */
import { Injectable, OnInit } from '@angular/core';
import * as _ from 'lodash';
const circularJson = require('circular-json');
const bows = require('bows');

@Injectable()
export class LogService implements OnInit {
  constructor() {
  }

  public ngOnInit() {
    if (window) {
      (<any>window.localStorage).debug = true;
    }
  }

  public logEx(content: any, component?: string): void {
    this.log({
      content: content,
      component: component
    });
  }

  public logJson(content: any, component?: string): void {
    this.log({
      content: circularJson.stringify(content, undefined, 4),
      component: component
    });
  }

   private log(entry: { content: any, component: string }): void {
    if (!entry || !entry.content) return;
    let log = undefined;
    if (entry.component) {
      log = bows(entry.component);
    } else {
      log = bows('LogService');
    }
    log(entry.content);
  }
}


