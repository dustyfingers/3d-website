import * as THREE from 'three';
// orbit controls allow us to move around the scene using our mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

import './style.css';

// scene is the container that holds objects, cameras and lights
const scene = new THREE.Scene();

// perspective camera mimics what human eyes see
// first argument is field of view, eg 75deg out of 360 second argument is aspect ratio
// thirs and fourth arguments are the 'view frustrum' eg what is visible to the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer renders objects in our scene to the screen
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

// configfure renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// confirgure camera
camera.position.setZ(30);

// build geometry and material for torus
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

// build torus
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

// add torus to scene
scene.add(torus);

// build and configure point light
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20);

// build ambient light and add to scene
const ambientLight = new THREE.AmbientLight(0xFFFFFF);

// add lights to scene
scene.add(pointLight, ambientLight);

// lights helpers show where the light is in the scene using a little wireframe
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

// grid helpers show where the grid is in the scene
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

// build controls 
const controls = new OrbitControls(camera, renderer.domElement);

// constantly rerender
const animate = () => {
  requestAnimationFrame(animate);

  // rotates the torus
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()