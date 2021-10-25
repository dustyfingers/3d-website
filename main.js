import * as THREE from 'three';

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
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });

// build torus
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

// add tous to scene
scene.add(torus);

// constantly rerender
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate()