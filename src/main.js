import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield, { twinkleStars } from './getStarfield.js';
import { getFresnelMat } from './fresnelShader.js';

// Create scene and camera
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

// Renderer for the scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.getElementById("main-content").appendChild(renderer.domElement);

// Geometry and mesh for the Earth
const detail = 32;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);

// Day texture material with alpha test for dynamic lighting
const dayMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("/8k_earth_daymap.jpg"),
});

// Night texture material with custom blending
const nightMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending,
    opacity: 0.8,
});

const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: loader.load("/8k_earth_clouds.jpg"),
    transparent: true,
    opacity: 0.86,
    blending: THREE.AdditiveBlending,
    fog: true,
});

const fresnelMat = getFresnelMat();

// Create earth group and apply tilt
const earthMesh = new THREE.Mesh(geometry, dayMaterial);
const nightMesh = new THREE.Mesh(geometry, nightMaterial);
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial);
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;

earthGroup.add(earthMesh);
earthGroup.add(nightMesh);
earthGroup.add(cloudsMesh);
earthGroup.add(glowMesh)

glowMesh.scale.setScalar(1.007);
cloudsMesh.scale.setScalar(1.008);

scene.add(earthGroup);

// Directional lighting for the scene
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(-3, 0.5, 0.8);
scene.add(sunLight);

// Camera controls
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1.5;
controls.maxDistance = 90;

// Starfield setup
const { starfield, starBackground } = getStarfield({ numStars: 8000 });
scene.add(starBackground);
scene.add(starfield);

// Animation loop
function animate() {
    earthMesh.rotation.y += 0.0001;
    cloudsMesh.rotation.y += 0.0002;
    nightMesh.rotation.y += 0.0001;
    glowMesh.rotation.y += 0.0001;

    // Make stars twinkle
    twinkleStars(starfield.geometry);
    controls.update();
    renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);
