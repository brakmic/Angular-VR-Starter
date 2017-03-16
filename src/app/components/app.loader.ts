// speed up the initial styles loading
require('app/themes/initial.scss');

// Interfaces
import { IAppState, IVrModule } from 'app/interfaces';
// Enums
import { VrModuleType } from 'app/enums';

const panorama = <IVrModule>{
              id: '001',
              name: 'Panorama',
              type: VrModuleType.AFrame,
              markup: `
             <a-scene>
               <a-sky src="assets/images/puydesancy.jpg" rotation="0 -130 0"></a-sky>
             </a-scene>
              `
            };
const curvedMockups = <IVrModule>{
    id: '002',
    name: 'Curved Mockups',
    type: VrModuleType.AFrame,
    markup: `
    <a-scene>
            <a-assets>
                <img id="mozvr" src="/assets/images/mozvr.png">
                <img id="shadow2" src="/assets/images/radial-shadow-2.png">
                <img id="ui1" src="/assets/images/ui-1.png">
                <img id="ui2" src="/assets/images/ui-2.png">
                <img id="ui3" src="/assets/images/ui-3.png">
            </a-assets>

            <a-curvedimage src="#ui3" radius="5.7" theta-length="180" height="9"
                            rotation="0 90 0" scale="1.2 1.2 1.2"></a-curvedimage>
            <a-curvedimage src="#mozvr" radius="5.7" theta-length="17" height=".36"
                            opacity="0.2" rotation="0 250 0" position="0 2 0"></a-curvedimage>
            <a-curvedimage src="#ui1" radius="5.7" theta-length="72" height="2.6"
                        rotation="0 80 0" position="0 0.7 0" scale="0.6 0.6 0.6"></a-curvedimage>
            <a-curvedimage src="#ui2" radius="5.7" theta-length="70" height="3.02"
                            rotation="0 -130 0" scale="0.8 0.8 0.8"></a-curvedimage>

            <a-image position="0 -5 0" src="#shadow2" rotation="-90 0 0" scale="6 6 6"></a-image>
            <a-sky color="#fff"></a-sky>
            <a-camera position="0 1.8 1.5"></a-camera>
            </a-scene>
    `
};
const spheresAndFog = <IVrModule>{
    id: '003',
    name: 'Spheres and Fog',
    type: VrModuleType.AFrame,
    markup: `
    <a-scene fog="type: linear; color: #AAB; far: 30; near: 0">
        <a-assets>
        <img id="highlight1" src="/assets/images/radial-highlight.png">
        <img id="shadow3" src="/assets/images/radial-shadow-3.png">
        </a-assets>

        <!-- Ground Highlight -->
        <a-image position="0 -.2 5" src="#highlight1" rotation="-90 0 0"
                scale="30 30 30"></a-image>

        <!-- Orange -->
        <a-entity position="0 0 -5">
        <a-sphere position="0 4.2 0" radius="4.2" color="#F16745"
                    roughness="0.8" width-segments="52" height-segments="52"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="3 3 3"></a-image>
        </a-entity>

        <!-- Green -->
        <a-entity position="-3 0 0">
        <a-sphere position="0 1.75 0" radius="1.75" color="#7BC8A4"
                    roughness="0.2"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="1.75 1.75 1.75"></a-image>
        </a-entity>

        <!-- Blue -->
        <a-entity position="1 0 0">
        <a-sphere position="0 1 0" radius="1" color="#4CC3D9" metalness="0.1"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="1 1 1"></a-image>
        </a-entity>

        <!-- Yellow -->
        <a-entity position="3 0 1">
        <a-sphere position="0 0.5 0" radius="0.5" color="#FFC65D"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="0.5 0.5 0.5"></a-image>
        </a-entity>

        <!-- Purple -->
        <a-entity position="20 0 -2">
        <a-sphere position="0 10 0" radius="10" color="#93648D"
                    segments-width="52" segments-height="52"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="9 9 9"></a-image>
        </a-entity>

        <!-- Yellow -->
        <a-entity position="-24 0 -34">
        <a-sphere position="0 18 0" radius="18" color="#FFC65D"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="8 8 8"></a-image>
        </a-entity>

        <!-- Green -->
        <a-entity position="25 0 20">
        <a-sphere position="0 12 0" radius="12" color="#7BC8A4"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="8 8 8"></a-image>
        </a-entity>

        <!-- White -->
        <a-entity position="-15 0 5">
        <a-sphere position="0 3 0" radius="3" color="#ECECEC"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="3 3 3"></a-image>
        </a-entity>

        <!-- Orange -->
        <a-entity position="-6 0 6">
        <a-sphere position="0 1 0" radius="1" color="#F16745" roughness="0.8"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="1 1 1"></a-image>
        </a-entity>

        <!-- Yellow -->
        <a-entity position="-20 0 30">
        <a-sphere position="0 30 0" radius="30" color="#FFC65D" roughness="0.6"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="15 15 15"></a-image>
        </a-entity>

        <!-- Blue -->
        <a-entity position="-1 0 14">
        <a-sphere position="0 2 0" radius="2" color="#4CC3D9"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="2 2 2"></a-image>
        </a-entity>

        <!-- Orange -->
        <a-entity position="10 0 15">
        <a-sphere position="0 4 0" radius="4" color="#F16745" roughness="1"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="2 2 2"></a-image>
        </a-entity>

        <!-- Blue -->
        <a-entity position="6 0 4">
        <a-sphere position="0 1.5 0" radius="1.5" color="#4CC3D9" metalness="0.1"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="1.5 1.5 1.5"></a-image>
        </a-entity>

        <!-- Yellow -->
        <a-entity position="5 0 14">
        <a-sphere position="0 .6 0" radius=".6" color="#FFC65D"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="0.6 0.6 0.6"></a-image>
        </a-entity>

        <!-- Purple -->
        <a-entity position="5 0 25">
        <a-sphere position="0 2 0" radius="2" color="#93648D"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="2 2 2"></a-image>
        </a-entity>

        <!-- White -->
        <a-entity position="2 0 15">
        <a-sphere position="0 0.2 0" radius="0.2" color="#ECECEC"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="0.2 0.2 0.2"
                opacity="0.5"></a-image>
        </a-entity>

        <!-- Purple -->
        <a-entity position="4 0 10">
        <a-sphere position="0 0.15 0" radius="0.15" color="#93648D"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="0.25 0.25 0.25"
                opacity="0.6"></a-image>
        </a-entity>

        <!-- Blue -->
        <a-entity position="4 0 11">
        <a-sphere position="0 0.1 0" radius="0.1" color="#4CC3D9"></a-sphere>
        <a-image src="#shadow" rotation="-90 0 0" scale="0.15 0.15 0.15"
                opacity="0.6"></a-image>
        </a-entity>

        <!-- Green -->
        <a-entity position="5 0 11">
        <a-sphere position="0 0.3 0" radius="0.3" color="#7BC8A4"></a-sphere>
        <a-image src="#shadow3" rotation="-90 0 0" scale="0.25 0.25 0.25"
                opacity="0.6"></a-image>
        </a-entity>

        <!-- Background -->
        <a-sky color="#AAB"></a-sky>
    </a-scene>
    `
};

const shopping = <IVrModule>{
    id: '004',
    name: 'Shopping',
    type: VrModuleType.AFrame,
    markup: `
        <a-scene>
        <a-assets>
                <a-asset-item id="why-male-models" 
                                src="/assets/images/shopping/man/man.dae">
                </a-asset-item>
                <img id="fall" src="/assets/images/shopping/fall.png">
                <img id="goggles" src="/assets/images/shopping/goggles.png">
                <img id="mozvr" src="/assets/images/mozvr.png">
                <img id="price" src="/assets/images/shopping/price.png">
                <img id="shadow2" src="assets/images/radial-shadow-2.png">
                <img id="shoes" src="/assets/images/shopping/shoes.png">
        </a-assets>

        <a-camera position="0 1.6 0"></a-camera>

        <a-entity id="model" position="0 0 -2">
        <a-animation attribute="rotation" from="0 -30 0" to="0 330 0" dur="15000"
                        easing="linear" repeat="infinite"></a-animation>
        <a-collada-model position="-.35 0 .55" rotation="0 -20 0" scale="1.5 1.5 1.5"
                                src="#why-male-models"></a-collada-model>
                <a-image src="#shadow2" rotation="-90 0 0" scale="0.5 0.5 0.5"></a-image>
        </a-entity>

        <a-curvedimage id="mozvr-logo" src="#mozvr" radius="5.7" theta-length="36" height="1"
                        position="0 2.6 0" opacity="0.5">
        <a-animation attribute="rotation" from="0 10 0" to="0 200 0" begin="500"
                        dur="1000"></a-animation>
        </a-curvedimage>

        <a-image id="price" src="#price" width="7" height="3.5" scale="0.2 0.2 0.2">
        <a-animation attribute="position" from="0 2.8 -6" to="2.25 2.8 -6" begin="1000"
                        dur="1000"></a-animation>
        </a-image>

        <a-cylinder id="goggles" color="#101010" height="0.02" radius="0.8">
        <a-animation attribute="rotation" from="-270 0 0" to="-90 0 0" dur="750" begin="1000"
                fill="both"></a-animation>
        <a-animation attribute="position" from="8 0 -9" to="8 3.5 -9" dur="750" begin="1000"
                fill="both"></a-animation>
        <a-image src="#goggles" width="2" height="1" rotation="90 0 0" position="0 -.05 0"
                scale=".4 .4 .4"></a-image>
        </a-cylinder>

        <a-curvedimage id="stereoscopic-fall-collection-text" src="#fall" radius="5.7"
                        theta-length="18" height=".45" position="0 0.9 0" scale=".4 .4 .4">
                <a-animation attribute="rotation" from="0 180 0" to="0 210 0" begin="750"
                        dur="1000"></a-animation>
        </a-curvedimage>

        <a-curvedimage id="shoes" src="#shoes" radius="5.7" theta-length="18" height=".8"
                        position="0 0.9 0" scale=".4 .4 .4">
                <a-animation attribute="rotation" from="0 180 0" to="0 130 0" begin="750"
                        dur="1000"></a-animation>
        </a-curvedimage>

        <a-entity>
        <a-cylinder position="0 0.5 0" radius="4" height="1.6" side="back" open-ended="true"
                color="#FFF"></a-cylinder>
        </a-entity>

            <a-sky color="#ECECEC"></a-sky>
            <a-light type="directional" color="#fff" intensity="0.2" position="-1 2 1"></a-light>
            <a-light type="ambient" color="#fff"></a-light>
        </a-scene>
    `
};

const dynamicLights = <IVrModule> {
        id: '005',
        name: '360° Video',
        type: VrModuleType.AFrame,
        markup: `
          <a-scene>
                <a-assets>
                        <video id="video" src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"
                        autoplay loop crossorigin></video>
                </a-assets>

                <a-videosphere src="#video" rotation="0 180 0"></a-videosphere>
          </a-scene>
        `
};

export const predefinedModules: IVrModule[] = [panorama, curvedMockups,
                                               spheresAndFog, shopping,
                                               dynamicLights];

