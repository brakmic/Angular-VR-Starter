![image](http://imageup.info/upload/big/2016/07/14/57881762015e8.png)

This is an [Angular 4](https://angular.io/)-based environment for building WebVR apps with Mozilla's [A-frame](https://aframe.io/).

[Live Demo](http://brakmic.com/demos/vrdemo/)

Read my [article](http://blog.brakmic.com/webvr-with-a-frame-angular/) describing the internals.

**Notice**: this demo contains graphics, SVGs and markups taken from the A-Frame homepage. 

*All copyrights regarding these materials belong to Mozilla and/or other companies and groups (MozVR team etc.)*.

### Installation

```
yarn 
```

or

```
npm install
```

#### Building 
```
npm start build:prod 
```

#### Running with Hot-Reloading 
Type
```
npm run start:hmr 
```
*then open [localhost:3000](http://localhost:3000) in your browser*.

## Structure 

The [main component](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.component.ts) loads available vr modules at boot. By using a simple [routing mechanism](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.routes.ts) the [Wrapper](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/wrapper/wrapper.component.ts) configures the [VrElement Directive](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/vr-element/vr-element.directive.ts) to activate a selected VR-module.


### State Management

The application state management is done via [@ngrx](https://github.com/ngrx/ngrx.github.io). 

The currently available VR modules are located in [app.loader.ts](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.loader.ts). Every module implements the [IVrModule](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts) interface and must contain a single [markup structure](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts#L7) and several (optional) [scripts](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts#L8). All of them will be [injected](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/vr-element/vr-element.directive.ts) as separate HTML script tags below the markup. The helper function for dynamic creation of components is located in [ComponentFactory](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/helpers/component-factory/component-factory.ts).

During the application start the [VrModuleService](https://github.com/brakmic/Angular2_VR_Starter/blob/master/src/app/services/vr-module/vr-module.service.ts#L40) registers all of the available modules by sending dispatch messages to @ngrx [AppStore](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/stores/app/app.store.ts). 


### FAQ

**Q**: I'm getting `Uncaught TypeError: Cannot assign to read only property 'detachedCallback' of object '#'`!

**A**: A-Frame must be imported **before** Angular's [Zone.js](https://github.com/angular/zone.js/). This project's `import 'aframe'` is 
located in [polyfills.browser.ts](https://github.com/brakmic/Angular2_VR_Starter/blob/master/src/init/polyfills.browser.ts#L4). 

### License 

[MIT](https://github.com/brakmic/Angular_VRDemo/blob/master/LICENSE)
