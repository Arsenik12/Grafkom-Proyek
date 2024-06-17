import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(100, 80, 0);
camera.lookAt(0, 0, 0);

// Orbit control
var controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

// Directional light
var light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

// Check progress
const onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(percentComplete.toFixed(2) + "% downloaded");
  }
};

// Load objects
let car1;

new MTLLoader()
  .setPath("resources/ModelGrafkom/Base/")
  .load("base.mtl", function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath("resources/ModelGrafkom/Base/")
      .load(
        "base.obj",
        function (object) {
          object.position.set(0, 0, 0);
          object.scale.setScalar(5);
          scene.add(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("resources/ModelGrafkom/kendaraan/")
  .load("car1.mtl", function (materials) {
    materials.preload();
    new OBJLoader()
      .setMaterials(materials)
      .setPath("resources/ModelGrafkom/kendaraan/")
      .load(
        "car1.obj",
        function (object) {
          object.position.set(-8, 5, -70);
          object.scale.setScalar(5);
          car1 = object;
          scene.add(object);
        },
        onProgress
      );
  });

const clock = new THREE.Clock();
let mixer;
let orang;

const loader = new FBXLoader();
loader.load("resources/ModelGrafkom/Walking.fbx", function (object) {
  mixer = new THREE.AnimationMixer(object);
  const action = mixer.clipAction(object.animations[0]);
  action.play();
  object.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  object.position.set(-8, 5, -70);
  object.scale.setScalar(0.1);
  orang = object;
  scene.add(object);
});

// Camera control variables
let targetObject = null;
let isFollowing = false;
let isZoomingIn = false;
let isZoomingOut = false;
let isFirstPerson = false;
let roll = 0,
  pitch = 0,
  yaw = 0;

// Camera representation
const cameraGeometry = new THREE.BoxGeometry(5, 5, 20); 
const cameraMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cameraMesh = new THREE.Mesh(cameraGeometry, cameraMaterial);
scene.add(cameraMesh);

// Keyboard controls
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
      targetObject = car1;
      isFollowing = true;
      isFirstPerson = false;
      controls.enabled = false;
      break;
    case "2":
      targetObject = orang;
      isFollowing = true;
      isFirstPerson = false;
      controls.enabled = true; 
      break;
    case "3":
      targetObject = orang;
      isFollowing = true;
      isFirstPerson = true;
      controls.enabled = false;
      break;
    case "0":
      isFollowing = false;
      isFirstPerson = false;
      controls.enabled = true;
      break;
    case "w":
      isZoomingOut = true;
      break;
    case "s":
      isZoomingIn = true;
      break;
    case "ArrowLeft":
      yaw += 0.1;
      break;
    case "ArrowRight":
      yaw -= 0.1;
      break;
    case "ArrowUp":
      pitch += 0.1;
      break;
    case "ArrowDown":
      pitch -= 0.1;
      break;
    case "q":
      roll -= 0.1;
      break;
    case "e":
      roll += 0.1;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      isZoomingOut = false;
      break;
    case "s":
      isZoomingIn = false;
      break;
  }
});

let time_prev = 0;
function animate(time) {
  const dt = (time - time_prev) * 0.1;
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  if (car1) {
    car1.position.z += 0.5 * dt;
  }

  if (orang) {
    orang.position.z += 0.1 * dt;
  }

  // Zoom in/out
  if (isZoomingIn) {
    camera.position.z -= 1;
  }
  if (isZoomingOut) {
    camera.position.z += 1;
  }

  // Apply roll, pitch, yaw
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
  camera.rotation.z = roll;

  if (isFollowing && targetObject) {
    let offset;
    if (isFirstPerson) {
      // First-person view
      offset = new THREE.Vector3(0, 1.6 / 0.1, 0.5);
    } else {
      // Third-person view
      offset = new THREE.Vector3(0, 10, -30);
    }
    const targetPosition = targetObject.position.clone().add(offset);
    camera.position.lerp(targetPosition, 0.1); 
    if (isFirstPerson) {
      const lookAtPosition = targetObject.position.clone().add(new THREE.Vector3(0, 1.6 / 0.1, 2)); 
      camera.lookAt(lookAtPosition);
    } else {
      camera.lookAt(targetObject.position);
    }
  }

  // Update camera mesh position and rotation
  cameraMesh.position.copy(camera.position);
  cameraMesh.rotation.copy(camera.rotation);

  renderer.render(scene, camera);
  time_prev = time;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
