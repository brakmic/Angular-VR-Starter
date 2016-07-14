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

The main component is located at *src/app/components/app.component.ts*. It loads the **Wrapper** component from *shared*-subdir which then instantiates the available VR-modules by utilizing the **VrModule** directive (also located under *shared*). 

##### State Management

The application state management is done via [@ngrx](https://github.com/ngrx/ngrx.github.io). 

The currently available vr modules are located under *src/app/app.loader.ts*. 

During the application start a service called `vr-module.service` registers all of the available modules by sending dispatch messages to the **@ngrx/store**. 

#### License 

[MIT](https://github.com/brakmic/Angular_VRDemo/blob/master/LICENSE)
