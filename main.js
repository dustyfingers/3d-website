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

const addStar = () => {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  // randomly generate x, y, z vals
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200))

  star.position.set(x, y, z);

  scene.add(star);
}

// add 200 random stars 
Array(200).fill().forEach(() => addStar());

// space texture for scene bg
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// avatar 
const louTexture = new THREE.TextureLoader().load('headshot.jpg');
const lou = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: louTexture })
);

scene.add(lou);

// moon 
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonNormal = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: moonTexture,
    normalMap: moonNormal
  })
);

moon.position.z = 30;
moon.position.x = -10;

scene.add(moon);

const rotateTorus = () => {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
}

const rotateMoon = () => {
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
}

const rotateLou = () => {
  lou.rotation.y += 0.01;
  lou.rotation.x += 0.01;
}

const moveCamera = () => {
  const currentTop = document.body.getBoundingClientRect().top;

  rotateMoon();
  rotateLou();

  camera.position.z = currentTop * -0.01;
}

// constantly rerender
const rerender = () => {
  requestAnimationFrame(rerender);

  rotateTorus();

  controls.update();

  renderer.render(scene, camera);
}

document.body.onscroll = moveCamera;
rerender()