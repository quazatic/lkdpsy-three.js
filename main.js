import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//Create scene and camera
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);

//Renderer for the scene
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

//Geomoetry and mesh for the object
const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshStandardMaterial({color:0x9FC5E8});
const earthMesh = new THREE.Mesh(geometry,material);
scene.add(earthMesh);


//Camera controls and postion
camera.position.z = 5;
const controls = new OrbitControls( camera, renderer.domElement );

//Lighting shader for scene
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

//Animation and scene for WEBGL
function animate() {
    // Update earthMesh rotation inside the animation loop
    earthMesh.rotation.x += 0.001;
    earthMesh.rotation.y += 0.002;

    // Update controls
    controls.update();
  
    // Render the scene and camera on each frame
    renderer.render(scene, camera,);
  }
  
  // Set the animation loop, which calls animate() on each frame
  renderer.setAnimationLoop( animate );