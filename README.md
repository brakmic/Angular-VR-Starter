#### VR-Demo-1

![image](http://imageup.info/upload/big/2016/07/14/57881762015e8.png)

This is an [Angular 2](https://angular.io/)-based environment for building WebVR apps with Mozilla's [A-frame](https://aframe.io/).

The build scripts are based on [Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter) from [AngularClass](https://github.com/AngularClass). 

[Live Demo](http://brakmic.com/demos/vrdemo/)

Notice: the live demo contains graphics, SVGs and markups taken from the A-Frame homepage. 

*All copyrights regarding these materials belong to Mozilla and/or other companies and groups (MozVR team etc.)*.

#### Installation

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

#### Application Structure 

At boot the [main component](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.component.ts) loads available vr modules. A simple [routing mechanism](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.routes.ts) instantiates the [Wrapper](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/wrapper/wrapper.component.ts) which utilizes the [VrModule Directive](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/directives/vr-module.directive.ts) to activate a selected vr module.


##### State Management

The application state management is done via [@ngrx](https://github.com/ngrx/ngrx.github.io). 

The currently available VR modules are located in [src/app/components/app.loader.ts](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/app.loader.ts). Every module implements the [IVrModule](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts) interface and must contain a single [markup structure](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts#L7) and several (optional) [scripts](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/interfaces/declarations/IVrModule.ts#L8). All of the scripts will be [injected](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/components/shared/directives/vr-module.directive.ts#L102) as separate HTML script tags below the markup.

During the application start the [VrModuleService](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/services/vr-module/vr-module.service.ts) registers all of the available modules by sending dispatch messages to the @ngrx [AppStore](https://github.com/brakmic/Angular_VRDemo/blob/master/src/app/stores/app/app.store.ts). 

#### License 

[MIT](https://github.com/brakmic/Angular_VRDemo/blob/master/LICENSE)
