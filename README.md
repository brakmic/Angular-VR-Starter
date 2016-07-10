#### VR-Demo-1

![image](http://imageup.info/upload/big/2016/07/10/5782aeccc1e87.png)

This is an [Angular 2](https://angular.io/)-based environment for building WebVR apps with Mozilla's [A-frame](https://aframe.io/).

The build scripts are based on [Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter) from [AngularClass](https://github.com/AngularClass). 

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

The main component is located at *src/app/components/app.component.ts*. It loads the **Stage** component from *shared*-subdirectory which then instantiates the available VR-modules. 

The current RouterConfig of Stage.component is rather simple as it only points to the Stage itself. However, it should be no problem 
to add more routes and/or additional parameters to manipulate modules. 

##### Dynamic module loading

There's a module called *vr-module* that contains the [HelloWorld-demo](https://aframe.io/examples/showcase/helloworld/) from the 
A-Frame examples page. Unlike Stage.component this module is a pure Directive which dynamically instatiates a new Component. This piece of code is 
based on the [article](http://blog.lacolaco.net/post/dynamic-component-creation-in-angular-2/) from [laco0416](https://twitter.com/laco0416).

#### License 

[MIT](https://github.com/brakmic/Angular_VRDemo/blob/master/LICENSE)
