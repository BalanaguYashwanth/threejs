import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import sonyLogo from "../Sony_logo.svg";

// const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const p = document.createElement("p");
p.textContent = "Helloooooooooo";
const cPointLabel = new CSS2DObject(p);
scene.add(cPointLabel);
cPointLabel.position.set(1, 1, 1);

let model;
const modelURL = new URL("../exhibition_stand.glb", import.meta.url);
const assetLoader = new GLTFLoader();
assetLoader.load(
  modelURL.href,
  function (glb) {
    console.log(glb, "hello", modelURL.href);
    model = glb.scene;
    model.scale.set(0.09, 0.09, 0.09);
    scene.add(model);

    // model.position.set(0,2,0);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + " ====  100% loaded");
  },
  function (error) {
    console.error(error);
  }
);

const light = new THREE.DirectionalLight(0xfffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

//Boiler Plate code
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 1, 2);

const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor("white"); //setting background color
renderer.setSize(sizes.width, sizes.height);

document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
orbit.update();

const followText = document.getElementById("follow-text");
const canvas = document.querySelector("canvas");
const boxPosition = new THREE.Vector3();
let boxPositionOffset = new THREE.Vector3();

//GAMELOOP

const clock = new THREE.Clock();
let gameLoop = () => {
  // console.log('model--->', model)
  // MOVE TEXT
  if (model) {
    boxPosition.setFromMatrixPosition(model.matrixWorld);
    boxPosition.add(boxPositionOffset);
    boxPosition.project(camera);

    var widthHalf = window.innerWidth / 2,heightHalf = window.innerHeight / 2;
    boxPosition.x = (boxPosition.x * widthHalf) + widthHalf;
    boxPosition.y = - (boxPosition.y * heightHalf) + heightHalf;
    followText.style.top = `${boxPosition.y}px`;
    followText.style.left = `${boxPosition.x}px`;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(gameLoop);
};
gameLoop();
