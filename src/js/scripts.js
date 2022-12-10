import * as THREE from 'three';
import {OrbitControls, orbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { BoxGeometry, PerspectiveCamera } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(5); //It helps to add three coordinate system into the scene

scene.add(axesHelper);

const camera = new PerspectiveCamera(
    75, // Value can B/w 40 to 80 for field of axis
    window.innerWidth/window.innerHeight,
    0.1, //far or near
    1000 //far or near
)

const orbit = new OrbitControls(camera,renderer.domElement)

camera.position.set(1,2,8) //here  10 (z) -  camera goes near or far and 1(y) - camera goes up  and x(5) - camera goes right
orbit.update()

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
const box = new THREE.Mesh(boxGeometry,boxMaterial)

scene.add(box)

function animate(){
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;
    renderer.render(scene,camera);
}


renderer.setAnimationLoop(animate)