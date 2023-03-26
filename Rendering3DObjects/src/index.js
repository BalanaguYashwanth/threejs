import * as THREE from "three";
// import * as THREE from "./three.js-master/build/three.module.js";
// import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import sonyLogo from '../Sony_logo.svg'


const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const modelURL = new URL('../exhibition_stand.glb', import.meta.url)
const assetLoader  = new GLTFLoader();
assetLoader.load( modelURL.href,function(glb){
  console.log(glb,'hello',modelURL.href);
  const model = glb.scene;
  model.scale.set(0.09,0.09,0.09)
  scene.add(model);
  // model.position.set(0,2,0);
}, 
  function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + " ====  100% loaded");
    }, function(error){
  console.error(error);
});

const light = new THREE.DirectionalLight(0xfffff,1)
light.position.set(2,2,5)
scene.add(light)

//box and plane
// const textureLoader = new THREE.TextureLoader();
// const geometry = new THREE.PlaneGeometry(-1, -1);
// const material = new THREE.MeshBasicMaterial({
//   color: "lightgreen",
//   map: textureLoader.load(sonyLogo)
// });
// const boxMesh = new THREE.Mesh(geometry, material);
// scene.add(boxMesh);


// const planeGeometry = new THREE.PlaneGeometry(5,5);
// const planeMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.position(0,0,10);


// const texture = new THREE.TextureLoader().load(sonyLogo);
// const material = new THREE.MeshBasicMaterial( { map: texture } );
// scene.add(material)

//Boiler Plate code
const sizes = {
  width: 500,
  height: 500,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width /  sizes.height,
  0.1,
  100
);
camera.position.set(0, 1, 2);
scene.add(camera);




const renderer = new THREE.WebGL1Renderer();
// renderer.setClearColor('blue') //setting background color
renderer.setSize(sizes.width, sizes.height);

document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const orbit  = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
orbit.update();
// renderer.render(scene, camera);

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
}

animate()
