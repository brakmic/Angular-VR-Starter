import { VrWrapperModule } from './shared';
import { Routes, Route,
         PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export class PreloadSelectedModulesStrategy implements PreloadingStrategy {
  private loadParam: Function;
  private routeParam: Route;
  public preload(route: Route, load: Function): Observable<any> {
    this.routeParam = route;
    this.loadParam = load;
    return ((<any> route.data) && (<any> route.data).preload) ? this._load() : Observable.of(null);
  }
  private _load(): Observable<any> {
    if (this.routeParam && this.loadParam) {
      const mod = !_.isEmpty(this.routeParam.path) ? this.routeParam.path.toUpperCase() : 'VR';
      return this.loadParam();
    }
    return Observable.of(null);
  }
}

/**
 * All routes go towards Wrapper that prepares the stage for vr modules
 * to be loaded. With route we provide also an ID of the selected module. 
 * Check wrapper/wrapper.component.ts for more info on URL parameter handling.
 */
export const APP_ROUTES: Routes = [
  { path: '',
        children: [
          { path: '', loadChildren: './shared/wrapper#VrWrapperModule' },
          { path: ':area', loadChildren: './shared/wrapper#VrWrapperModule' }
        ]
  }
];
