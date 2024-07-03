import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement);

// setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,10000); //0.1 , 1000
camera.position.set(100, 80, 0); //0,0,100 asal //300, 200, -150 //700,500,-100 //100, 80, 0
camera.lookAt(0,0,0);

//orbit control
var controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0,5,0);
controls.update();

// scene.fog = new THREE.Fog(0x222244, 50, 500);
scene.fog = new THREE.FogExp2( 0x222244, 0.0025 );

// controls.minDistance = 50;
// controls.maxDistance = 2000;
// controls.zoomSpeed = 1.0;

// Light
{
// direction light
var light = new THREE.DirectionalLight(0xFFFFFF,10);
light.position.set(0,10,0);
light.target.position.set(-5,0,0);
light.castShadow = true;
scene.add(light);
scene.add(light.target);

// Hemisphere light
// light = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
// scene.add(light);

//point light
// light = new THREE.PointLight(0xFFFF00,50);
// light.position.set(0,10,0);
// scene.add(light);

//spot light
// light = new THREE.SpotLight(0xFF0000,50);
// light.position.set(10,10,0);
// scene.add(light);
}

//moon light
// {
// // Light
// var ambientLight = new THREE.AmbientLight(0x404040, 0.5); //low-intensity light
// scene.add(ambientLight);

// var moonLight = new THREE.DirectionalLight(0x8888FF, 20); // Soft blue light
// moonLight.position.set(-500, 300, 200);
// moonLight.castShadow = true;
// scene.add(moonLight);

// // objek bulan
// var moonGeometry = new THREE.SphereGeometry(50, 32, 32);
// var moonMaterial = new THREE.MeshBasicMaterial({ color: 0x8888FF });
// var moon = new THREE.Mesh(moonGeometry, moonMaterial);
// moon.position.set(-500, 300, 200);
// scene.add(moon);

// var pointLight = new THREE.PointLight(0x8888FF, 0.3);
// pointLight.position.set(-250, 150, 100);
// scene.add(pointLight);
// }

// geometry
const objects = [];

//CobaObjek
// {


// // //plane
// // {
// // var planeGeo = new THREE.PlaneGeometry(40,40);
// // var planeMat = new THREE.MeshPhongMaterial({
// //   color : 0x888888,
// //   side : THREE.DoubleSide
// // });
// // var mesh = new THREE.Mesh(planeGeo,planeMat);
// // mesh.rotation.x = Math.PI * -0.5;
// // scene.add(mesh);
// // }

// // //cube
// // {
// // var cubeGeo = new THREE.BoxGeometry(4,4,4);
// // var cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
// // var mesh = new THREE.Mesh(cubeGeo,cubeMat);
// // mesh.position.set(5,3.5,0);
// // scene.add(mesh);
// // }


// // //sphere
// // {
// // var sphereGeo = new THREE.SphereGeometry(3,32,16);
// // var sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
// // var mesh = new THREE.Mesh(sphereGeo,sphereMat);
// // mesh.position.set(-4,5,0);
// // scene.add(mesh);
// // }
// }
//=================================================================================================================

//cek progress
const onProgress = function ( xhr ) {

  if ( xhr.lengthComputable ) {

    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log( percentComplete.toFixed( 2 ) + '% downloaded' );

  }

};


//base
{
new MTLLoader()
    .setPath( 'resources/ModelGrafkom/Base/' )
    .load( 'base.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Base/' )
        .load( 'base.obj', function ( object ) {

          //atur disini
          object.position.x = 0;
          object.position.y = 0;
          object.position.z = 0;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );


    // const loader = new FBXLoader();
    // loader.load( 'resources/ModelGrafkom/Base/Base.fbx', function ( object ) {

    //   mixer = new THREE.AnimationMixer( object );

    //   const action = mixer.clipAction( object.animations[ 0 ] );
    //   action.play();

    //   object.traverse( function ( child ) {

    //     if ( child.isMesh ) {

    //       child.castShadow = true;
    //       child.receiveShadow = true;

    //     }

    //   } );

    //   scene.add( object );

    // } );
}

//lampujalan
{
  new MTLLoader() //1
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = -80;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,-80);

          light.angle = 0.8; // Sudut penyebaran cahaya
          light.penumbra = 0.5; // pinggir cahaya halus kasarnya
          light.decay = 2; // kepekatan cahaya
          light.distance = 110; // Jarak panjang cahaya 
          light.castShadow = true;

          light.target.position.set(-20,0,-80);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //2
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = -10;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,-10);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,-10);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //3
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 60;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,60);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true; 

          light.target.position.set(-20,0,60);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //4
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 130;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,130);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,130);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);


        }, onProgress );

    } );

    new MTLLoader() //5
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 200;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,200);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,200);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //6
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 270;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,270);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,270);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //7
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 340;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,340);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,340);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //8
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 410;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,410);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110; 
          light.castShadow = true;

          light.target.position.set(-20,0,410);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //9
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 480;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true; // Aktifkan pengecoran bayangan
              child.receiveShadow = true; // Aktifkan penerimaan bayangan
            }
          });

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,480);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,480);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );

    new MTLLoader() //10
    .setPath( 'resources/ModelGrafkom/LampuJalan/' )
    .load( 'LampuJalan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/LampuJalan/' )
        .load( 'LampuJalan.obj', function ( object ) {

          //atur disini
          object.position.x = 22;
          object.position.y = 13;
          object.position.z = 550;
          object.scale.setScalar( 5 );

          scene.add( object );

          //cahaya
          var light = new THREE.SpotLight(0xFFFFFF,50000);
          light.position.set(12,60,550);

          light.angle = 0.8;
          light.penumbra = 0.5;
          light.decay = 2;
          light.distance = 110;
          light.castShadow = true;

          light.target.position.set(-20,0,550);
          scene.add(light.target);
          scene.add(light);

          const spotLightHelper = new THREE.SpotLightHelper(light);
          scene.add(spotLightHelper);

        }, onProgress );

    } );
}

//pagerlaut
{
    new MTLLoader() //1
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = -80;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//2
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = -41;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//3
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = -2;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//4
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 37;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//5
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 76;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//6
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 115;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//7
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 154;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//8
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 193;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//9
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 232;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//10
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 271;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//11
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 310;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//12
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 349;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//13
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 388;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//14
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 427;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//15
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 466;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//16
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 505;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//17
    .setPath( 'resources/ModelGrafkom/Pagar/' )
    .load( 'Pagar.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Pagar/' )
        .load( 'Pagar.obj', function ( object ) {

          //atur disini
          object.position.x = 31;
          object.position.y = 17;
          object.position.z = 544;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );
}

//teropseng
{
  new MTLLoader() //1
      .setPath( 'resources/ModelGrafkom/TeropSeng/' )
      .load( 'TeropSeng.mtl', function ( materials ) {

        materials.preload();

        new OBJLoader()
          .setMaterials( materials )
          .setPath( 'resources/ModelGrafkom/TeropSeng/' )
          .load( 'TeropSeng.obj', function ( object ) {

            //atur disini
            object.position.x = -330;
            object.position.y = 10;
            object.position.z = 560;
            object.scale.setScalar( 5 );

            object.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            scene.add( object );

          }, onProgress );

      } );

      new MTLLoader() //2
      .setPath( 'resources/ModelGrafkom/TeropSeng/' )
      .load( 'TeropSeng.mtl', function ( materials ) {

        materials.preload();

        new OBJLoader()
          .setMaterials( materials )
          .setPath( 'resources/ModelGrafkom/TeropSeng/' )
          .load( 'TeropSeng.obj', function ( object ) {

            //atur disini
            object.position.x = -330;
            object.position.y = 10;
            object.position.z = 360;
            object.scale.setScalar( 5 );

            object.traverse(function (child) {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            scene.add( object );

          }, onProgress );

      } );
}

//pagarGudang
{
    new MTLLoader()
    .setPath( 'resources/ModelGrafkom/PagarGudang/' )
    .load( 'Fence.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/PagarGudang/' )
        .load( 'Fence.obj', function ( object ) {

          //atur disini
          object.position.x = -300;
          object.position.y = 5;
          object.position.z = 140;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );
}

//container
{
  {
  new MTLLoader() //1
  .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
  .load( 'tumpukan1.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
      .load( 'tumpukan1.obj', function ( object ) {

        //atur disini
        object.position.x = -280;
        object.position.y = 19;
        object.position.z = 115;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader() //2
  .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
  .load( 'tumpukan2.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
      .load( 'tumpukan2.obj', function ( object ) {

        //atur disini
        object.position.x = -280;
        object.position.y = 83;
        object.position.z = -60;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader() //3
  .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
  .load( 'tumpukan3.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
      .load( 'tumpukan3.obj', function ( object ) {

        //atur disini
        object.position.x = -355;
        object.position.y = 81;
        object.position.z = 160;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader() //4
  .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
  .load( 'tumpukan3.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Container/tumpukan/' )
      .load( 'tumpukan3.obj', function ( object ) {

        //atur disini
        object.position.x = -420;
        object.position.y = 81;
        object.position.z = 18;
        object.rotation.y = -1.55;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );
  }

  //animasi buka pintu

  new MTLLoader() //1
  .setPath( 'resources/ModelGrafkom/Container/animasi/' )
  .load( 'containeropen.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Container/animasi/' )
      .load( 'containeropen.obj', function ( object ) {

        //atur disini
        object.position.x = -340;
        object.position.y = 20;
        object.position.z = 55;
        object.rotation.y = -1.55;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader() // pintu kiri
  .setPath('resources/ModelGrafkom/Container/animasi/')
  .load('pintu1.mtl', function (materials) {

    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath('resources/ModelGrafkom/Container/animasi/')
      .load('pintu1.obj', function (object) {

        object.position.x = -340;
        object.position.y = 20;
        object.position.z = 55;
        object.rotation.y = -1.55;
        object.scale.setScalar(5);

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(object);

        setTimeout(function () {
          const initialRotation = object.rotation.y;
          const targetRotation = initialRotation + -Math.PI / 2; 
          const initialPositionX = object.position.x;
          const targetPositionX = initialPositionX + 48; 
          const initialPositionZ = object.position.z;
          const targetPositionZ = initialPositionZ - 25;
          const duration = 1000; 

          animateRotationAndPositionY(object, initialRotation, targetRotation, initialPositionX, targetPositionX, initialPositionZ, targetPositionZ, duration);
        }, 61000);

      }, onProgress);

  });

new MTLLoader() //pintu kanan
  .setPath('resources/ModelGrafkom/Container/animasi/')
  .load('pintu2.mtl', function (materials) {

    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath('resources/ModelGrafkom/Container/animasi/')
      .load('pintu2.obj', function (object) {

        object.position.x = -340;
        object.position.y = 20;
        object.position.z = 55;
        object.rotation.y = -1.55;
        object.scale.setScalar(5);

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

    
        scene.add(object);


        setTimeout(function () {

          const initialRotation = object.rotation.y;
          const targetRotation = initialRotation + Math.PI / 2; 
          const initialPositionX = object.position.x;
          const targetPositionX = initialPositionX + 48; 
          const initialPositionZ = object.position.z;
          const targetPositionZ = initialPositionZ + 23;
          const duration = 1000; 

          animateRotationAndPositionY(object, initialRotation, targetRotation, initialPositionX, targetPositionX, initialPositionZ, targetPositionZ, duration);
        }, 61000); 

      }, onProgress);

  });

function animateRotationAndPositionY(object, initialRotation, targetRotation, initialPositionX, targetPositionX, initialPositionZ, targetPositionZ, duration) {
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;
    const currentRotation = initialRotation + (targetRotation - initialRotation) * progress;
    const currentPositionX = initialPositionX + (targetPositionX - initialPositionX) * progress;
    const currentPositionZ = initialPositionZ + (targetPositionZ - initialPositionZ) * progress;

    object.rotation.y = currentRotation;
    object.position.x = currentPositionX;
    object.position.z = currentPositionZ;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

}

//tanamanjalan
{
    new MTLLoader()
    .setPath( 'resources/ModelGrafkom/TanamanJalanan/' )
    .load( 'TanamanJalanan.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/TanamanJalanan/' )
        .load( 'TanamanJalanan.obj', function ( object ) {

          //atur disini
          object.position.x = -30;
          object.position.y = 8;
          object.position.z = -70;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );
}

//gene
{
  new MTLLoader()//1
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = -80;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//2
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 5;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//3
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 90;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//4
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 175;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//5
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 260;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//6
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 345;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//7
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 430;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );

    new MTLLoader()//8
    .setPath( 'resources/ModelGrafkom/Gene/' )
    .load( 'Gene.mtl', function ( materials ) {

      materials.preload();

      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Gene/' )
        .load( 'Gene.obj', function ( object ) {

          //atur disini
          object.position.x = 33;
          object.position.y = -25;
          object.position.z = 515;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          scene.add( object );

        }, onProgress );

    } );
}

//cone
{
  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/Cone/' )
  .load( 'ConeParkir.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Cone/' )
      .load( 'ConeParkir.obj', function ( object ) {

        //atur disini
        object.position.x = -375;
        object.position.y = 5;
        object.position.z = 548;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//2
  .setPath( 'resources/ModelGrafkom/Cone/' )
  .load( 'ConeParkir.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Cone/' )
      .load( 'ConeParkir.obj', function ( object ) {

        //atur disini
        object.position.x = -375;
        object.position.y = 5;
        object.position.z = 348;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//3
  .setPath( 'resources/ModelGrafkom/Cone/' )
  .load( 'conekecil.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Cone/' )
      .load( 'conekecil.obj', function ( object ) {

        //atur disini
        object.position.x = -255;
        object.position.y = 5;
        object.position.z = 550;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );
}

//garasi
{
  //hiasan
  {
    //bata
    new MTLLoader()//1
    .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
    .load( 'garasihiasan.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
        .load( 'garasihiasan.obj', function ( object ) {
  
          //atur disini
          object.position.x = -140;
          object.position.y = 33;
          object.position.z = 534;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//2
    .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
    .load( 'garasihiasan.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
        .load( 'garasihiasan.obj', function ( object ) {
  
          //atur disini
          object.position.x = -267;
          object.position.y = 33;
          object.position.z = 534;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    //lampu
    new MTLLoader()//1
    .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
    .load( 'garasilamp.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
        .load( 'garasilamp.obj', function ( object ) {
  
          //atur disini
          object.position.x = -140;
          object.position.y = 33;
          object.position.z = 530;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );

          var cahayanih = new THREE.PointLight(0xFFA500,1500,1000,2);
          cahayanih.position.set(-118.5,44,500);
          cahayanih.castShadow = true;

          scene.add(cahayanih);

          const pointLightHelper = new THREE.PointLightHelper(cahayanih, 4);
          scene.add(pointLightHelper);
  
        }, onProgress );
  
    } );

    new MTLLoader()//2
    .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
    .load( 'garasilamp.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
        .load( 'garasilamp.obj', function ( object ) {
  
          //atur disini
          object.position.x = -182;
          object.position.y = 33;
          object.position.z = 530;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );

          var cahayanih = new THREE.PointLight(0xFFA500,1500,1000,2);
          cahayanih.position.set(-160,44,500);
          cahayanih.castShadow = true;

          scene.add(cahayanih);

          const pointLightHelper = new THREE.PointLightHelper(cahayanih, 4);
          scene.add(pointLightHelper);
  
        }, onProgress );
  
    } );
  }
  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
  .load( 'garasi1.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
      .load( 'garasi1.obj', function ( object ) {

        //atur disini
        object.position.x = -140;
        object.position.y = 31;
        object.position.z = 530;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//2
  .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
  .load( 'garasi1.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
      .load( 'garasi1.obj', function ( object ) {

        //atur disini
        object.position.x = -182;
        object.position.y = 31;
        object.position.z = 530;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//3
  .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
  .load( 'garasiopen1.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/Garasi Truck/' )
      .load( 'garasiopen1.obj', function ( object ) {

        //atur disini
        object.position.x = -139;
        object.position.y = 31;
        object.position.z = 530;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );
}

//Kendaraan
{
  //diam
  {
    new MTLLoader()//1
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'truck.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'truck.obj', function ( object ) {
  
          //atur disini
          object.position.x = -182;
          object.position.y = 5;
          object.position.z = 520;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//2
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car2.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car2.obj', function ( object ) {
  
          //atur disini
          object.position.x = -345;
          object.position.y = 5;
          object.position.z = 545;
          object.rotation.y = 1.6;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//3
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car1.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car1.obj', function ( object ) {
  
          //atur disini
          object.position.x = -345;
          object.position.y = 5;
          object.position.z = 520;
          object.rotation.y = 1.6;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//4
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car1.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car1.obj', function ( object ) {
  
          //atur disini
          object.position.x = -320;
          object.position.y = 5;
          object.position.z = 490;
          object.rotation.y = 2;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//5
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car2.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car2.obj', function ( object ) {
  
          //atur disini
          object.position.x = -345;
          object.position.y = 5;
          object.position.z = 465;
          object.rotation.y = -1.5;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//6 ini dicuri 
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car2.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car2.obj', function ( object ) {
  
          //atur disini
          object.position.x = -340;
          object.position.y = 5;
          object.position.z = 330;
          object.rotation.y = 1.6;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//7
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car2.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car2.obj', function ( object ) {
  
          //atur disini
          object.position.x = -315;
          object.position.y = 5;
          object.position.z = 380;
          object.rotation.y = -0.7;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//8
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car1.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car1.obj', function ( object ) {
  
          //atur disini
          object.position.x = -430;
          object.position.y = 5;
          object.position.z = 390;
          object.rotation.y = -2;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//9
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'car2.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'car2.obj', function ( object ) {
  
          //atur disini
          object.position.x = -450;
          object.position.y = 5;
          object.position.z = 480;
          object.rotation.y = 0;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//10
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'truckangkut.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'truckangkut.obj', function ( object ) {
  
          //atur disini
          object.position.x = -50;
          object.position.y = 34;
          object.position.z = 250;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//11
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'truckangkut.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'truckangkut.obj', function ( object ) {
  
          //atur disini
          object.position.x = -110;
          object.position.y = 34;
          object.position.z = -60;
          object.rotation.y = 3.1;
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

    new MTLLoader()//12
    .setPath( 'resources/ModelGrafkom/kendaraan/' )
    .load( 'truckangkutkosong.mtl', function ( materials ) {
  
      materials.preload();
  
      new OBJLoader()
        .setMaterials( materials )
        .setPath( 'resources/ModelGrafkom/kendaraan/' )
        .load( 'truckangkutkosong.obj', function ( object ) {
  
          //atur disini
          object.position.x = -160;
          object.position.y = 5;
          object.position.z = -20;
          
          object.scale.setScalar( 5 );

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
  
          scene.add( object );
  
        }, onProgress );
  
    } );

  }
  //jalan

  let car1;

  // const destinasi = new THREE.Vector3(-8, 5, 100);

  new MTLLoader()
  .setPath( 'resources/ModelGrafkom/kendaraan/' )
  .load( 'car1.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/kendaraan/' )
      .load( 'car1.obj', function ( object ) {

        //atur disini
        object.position.x = -8;
        object.position.y = 5;
        object.position.z = -70;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        car1 = object;

        scene.add( object );

      }, onProgress );

  } );

  // Animation function
  let time_prev = 0;
  function animate(time) {
    const dt = (time - time_prev) * 0.1;

    // if (car1) {
    //     const direction = new THREE.Vector3();
    //     direction.subVectors(destinasi, car1.position).normalize();
        
    //     const speed = 0.2; 
    //     car1.position.add(direction.multiplyScalar(speed * dt));
    // }

    if (car1) {
      car1.position.z += 0.5 * dt;
    }

    renderer.render(scene, camera);
    time_prev = time;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

}

//keamanan
{
  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/alataman/' )
  .load( 'alataman.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/alataman/' )
      .load( 'alataman.obj', function ( object ) {

        //atur disini
        object.position.x = -200;
        object.position.y = 8;
        object.position.z = 82;
        
        object.scale.setScalar( 3 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//1
  .setPath('resources/ModelGrafkom/alataman/')
  .load('alataman2.mtl', function (materials) {

    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath('resources/ModelGrafkom/alataman/')
      .load('alataman2.obj', function (object) {

        object.position.x = -197.5;
        object.position.y = 19.5;
        object.position.z = 80;
        
        object.scale.setScalar(3);

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(object);

        setTimeout(function() {
          const initialRotation = object.rotation.x;
          const targetRotation = initialRotation + Math.PI / 2; 
          const initialPositionZ = object.position.z;
          const targetPositionZ = initialPositionZ+2; 
          const duration = 1000; 

          animateRotationAndPosition(object, initialRotation, targetRotation, initialPositionZ, targetPositionZ, duration);
        }, 47000); 

      }, onProgress);

  });

function animateRotationAndPosition(object, initialRotation, targetRotation, initialPositionZ, targetPositionZ, duration) {
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;
    const currentRotation = initialRotation + (targetRotation - initialRotation) * progress;
    const currentPositionZ = initialPositionZ + (targetPositionZ - initialPositionZ) * progress;

    object.rotation.x = currentRotation;
    object.position.z = currentPositionZ;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

  new MTLLoader()//2
  .setPath( 'resources/ModelGrafkom/alataman/' )
  .load( 'alataman.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/alataman/' )
      .load( 'alataman.obj', function ( object ) {

        //atur disini
        object.position.x = -200;
        object.position.y = 8;
        object.position.z = 28;
        
        object.scale.setScalar( 3 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()//2
  .setPath( 'resources/ModelGrafkom/alataman/' )
  .load( 'alataman2.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/alataman/' )
      .load( 'alataman2.obj', function ( object ) {

        //atur disini
        object.position.x = -197.5;
        object.position.y = 19.5;
        object.position.z = 48;
        
        object.scale.setScalar( 3 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  
}

//cctv
{
//kiri
  {

  let cctv;
  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/cctv/' )
  .load( 'cctv.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/cctv/' )
      .load( 'cctv.obj', function ( object ) {

        //atur disini
        object.position.x = -198.4;
        object.position.y = 62;
        object.position.z = 85;
        
        object.scale.setScalar( 0.6 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        cctv = object;

        scene.add( object );

      }, onProgress );

  } );

  let time_prev = 0;
  function animate(time) {
    const dt = (time - time_prev) * 0.001;

    if (cctv) {
      cctv.rotation.y += 0.5 * dt;
    }

    renderer.render(scene, camera);
    time_prev = time;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

  new MTLLoader()
  .setPath( 'resources/ModelGrafkom/cctv/' )
  .load( 'batangcctv.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/cctv/' )
      .load( 'batangcctv.obj', function ( object ) {

        //atur disini
        object.position.x = -198.4;
        object.position.y = 62;
        object.position.z = 85;
        
        object.scale.setScalar( 0.6 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  }

  //kanan

{
  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/cctv/' )
  .load( 'cctv.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/cctv/' )
      .load( 'cctv.obj', function ( object ) {

        //atur disini
        object.position.x = -198.4;
        object.position.y = 62;
        object.position.z = 0;
        
        object.scale.setScalar( 0.6 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()
  .setPath( 'resources/ModelGrafkom/cctv/' )
  .load( 'batangcctv.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/cctv/' )
      .load( 'batangcctv.obj', function ( object ) {

        //atur disini
        object.position.x = -198.4;
        object.position.y = 62;
        object.position.z = 0;
        
        object.scale.setScalar( 0.6 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );

      }, onProgress );

  } );
}


}

//surya
{

  let sunObject, moonObject;
  let sunLight, moonLight;

  new MTLLoader()//1
  .setPath( 'resources/ModelGrafkom/surya/' )
  .load( 'sun.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/surya/' )
      .load( 'sun.obj', function ( object ) {

        //atur disini
        object.position.x = -182;
        object.position.y = 250;
        object.position.z = 300;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );
        sunObject = object;

        sunLight = new THREE.DirectionalLight(0xffffff, 10);
        sunLight.position.copy(sunObject.position);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // sunLight.target.position.set(-500,100,300);
        // scene.add(sunLight.target);

        const helpernih = new THREE.DirectionalLightHelper(sunLight);
        scene.add(helpernih);

      }, onProgress );

  } );

  new MTLLoader()//2
  .setPath( 'resources/ModelGrafkom/surya/' )
  .load( 'Moon.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'resources/ModelGrafkom/surya/' )
      .load( 'Moon.obj', function ( object ) {

        //atur disini
        object.position.x = -182;
        object.position.y = -250;
        object.position.z = 300;
        object.scale.setScalar( 5 );

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add( object );
        moonObject = object;

        moonLight = new THREE.PointLight(0x9999ff, 0.5, 1000);
        moonLight.position.copy(moonObject.position);
        moonLight.castShadow = true;
        scene.add(moonLight);

        const helpernihh = new THREE.PointLightHelper(moonLight);
        scene.add(helpernihh);

      }, onProgress );

  } );

  let time_prev_sun_moon = 0;
  let speed = 0.0001; // Kecepatan rotasi
  function animateSunMoon(time) {
    const dt = (time - time_prev_sun_moon) * 0.1;
    if (sunObject) {
      sunObject.rotation.x += speed * dt;
      sunObject.rotation.y += speed * dt;
      sunObject.position.x = 800 * Math.cos(speed * time);
      sunObject.position.y = 400 * Math.sin(speed * time);
      sunLight.position.copy(sunObject.position);
    }
    if (moonObject) {
      moonObject.rotation.x += speed * dt;
      moonObject.rotation.y += speed * dt;
      moonObject.position.x = 800 * Math.cos(speed * time + Math.PI);
      moonObject.position.y = 400 * Math.sin(speed * time + Math.PI);
      moonLight.position.copy(moonObject.position);
    }
    time_prev_sun_moon = time;
    requestAnimationFrame(animateSunMoon);
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animateSunMoon);



}

//char
// {
  
//   const clock = new THREE.Clock();
//   let mixer;
//   let orang;

//   const loader = new FBXLoader();
//   loader.load( 'resources/ModelGrafkom/Walking.fbx', function ( object ) {

//     mixer = new THREE.AnimationMixer( object );

//     const action = mixer.clipAction( object.animations[ 0 ] );
//     action.play();

//     object.traverse(function (child) {
//       if (child.isMesh) {
//         child.material = new THREE.MeshStandardMaterial({
//           color: child.material.color,
//           map: child.material.map,
//           normalMap: child.material.normalMap,
//           roughness: 0.8,
//           metalness: 0.2
//         });
//         child.castShadow = true;
//         child.receiveShadow = true;
//       }
//     });

//     scene.add( object );

//     object.position.x = -8;
//     object.position.y = 5;
//     object.position.z = -70;
//     object.scale.setScalar(0.1);

//     orang = object;

//   } );

//   // Animation function
//   let time_prev = 0;
//   function animate(time) {
//     const dt = (time - time_prev) * 0.1;

//     const delta = clock.getDelta();

//     if ( mixer ) mixer.update( delta );

//     if (orang) {
//       orang.position.z += 0.1 * dt;
//     }

//     renderer.render(scene, camera);
//     time_prev = time;
//     requestAnimationFrame(animate);
//   }
//   requestAnimationFrame(animate);

// }
 
//karakter
// {
// const clock = new THREE.Clock();
// let mixer;
// let orang;
// let currentAction, actions = [];
// let progress = 0;
// const speed = 0.1;
// let currentAnimationIndex = 0;
// let animationComplete = false;

// const paths = [
//   {
//     points: [
//       new THREE.Vector3(0, 5, 0),
//       new THREE.Vector3(0, 5, 50),
//       new THREE.Vector3(-50, 5, 50),
//       new THREE.Vector3(-50, 5, -10),
//       new THREE.Vector3(-80, 10, -10),
//       new THREE.Vector3(-90, 10, -10),
//       new THREE.Vector3(-92, 5, -10),
//       new THREE.Vector3(-93, 5, -10),
//     ],
//     animationPath: 'resources/ModelGrafkom/Walking.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-93, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
      
//     ],
//     animationPath: 'resources/ModelGrafkom/Leaning.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },
  
//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 52),
//       new THREE.Vector3(-300, 5, 52),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-300, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),


//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-40, 5, 52),
//       new THREE.Vector3(-40, 5, 320),
//       new THREE.Vector3(-340, 5, 320),
//     ],
//     animationPath: 'resources/ModelGrafkom/Running.fbx'
//   },

// ];

// let currentPath = paths[currentAnimationIndex];
// let curve = new THREE.CatmullRomCurve3(currentPath.points);

// const loader = new FBXLoader();
// loader.load(currentPath.animationPath, function (object) {
//   mixer = new THREE.AnimationMixer(object);

//   const action = mixer.clipAction(object.animations[0]);
//   actions.push(action);
//   currentAction = actions[0];
//   currentAction.play();

//   object.traverse(function (child) {
//     if (child.isMesh) {
//       child.material = new THREE.MeshStandardMaterial({
//         color: child.material.color,
//         map: child.material.map,
//         normalMap: child.material.normalMap,
//         roughness: 0.8,
//         metalness: 0.2
//       });
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   scene.add(object);

//   object.position.set(0, 0, 0);
//   object.scale.setScalar(0.1);

//   orang = object;
// });


// let time_prev = 0;

// function loadNextAnimation() {
//   currentAnimationIndex++;
//   if (currentAnimationIndex >= paths.length) {

//     return;
//   }
//   currentPath = paths[currentAnimationIndex];
//   curve = new THREE.CatmullRomCurve3(currentPath.points);

//   loader.load(currentPath.animationPath, function (object) {
//     mixer.stopAllAction(); 
        
//     mixer = new THREE.AnimationMixer(object);


//     const action = mixer.clipAction(object.animations[0]);
//     actions.push(action);
//     currentAction = action;
//     currentAction.fadeIn(0.5).play();

//     object.traverse(function (child) {
//       if (child.isMesh) {

//         child.material = new THREE.MeshStandardMaterial({
//           color: child.material.color,
//           map: child.material.map,
//           normalMap: child.material.normalMap,
//           roughness: 0.8,
//           metalness: 0.2
//         });
//         child.castShadow = true;
//         child.receiveShadow = true;
//       }
//     });

//     scene.add(object);

//     object.position.set(0, 0, 0);
//     object.scale.setScalar(0.1);

  
//     if (orang) {
//       scene.remove(orang);
//     }

//     orang = object;

 
//     progress = 0;
//     animationComplete = false;
//   });
// }

// function animate(time) {
//   const dt = (time - time_prev) * 0.1;
//   const delta = clock.getDelta();

//   if (mixer) mixer.update(delta);

//   if (orang && !animationComplete) {

//     progress += speed * delta;
//     if (progress > 1) {
//       progress = 1; 
//       animationComplete = true;
//       currentAction.fadeOut(0.5);
//       setTimeout(loadNextAnimation, 500);
//     }

//     const point = curve.getPointAt(progress);
//     const tangent = curve.getTangentAt(progress);


//     orang.position.copy(point);
//     orang.lookAt(point.clone().add(tangent));

//       if (currentAnimationIndex === 2) { 
//         orang.rotation.set(0, Math.PI / 2, 0); 
//     }
//       if (currentAnimationIndex === 3) { 
//         orang.rotation.set(0, -Math.PI / 2, 0); 
//     }
//     if (currentAnimationIndex === 4) { 
//       orang.rotation.set(0, Math.PI / 2, 0); 
//   }
//   }

//   renderer.render(scene, camera);
//   time_prev = time;
//   requestAnimationFrame(animate);
// }
// requestAnimationFrame(animate);
// }


// {

// let clock = new THREE.Clock();
// let mixer, orang, currentAction, actions = [];
// let progress = 0;
// const speed = 0.1;
// let currentAnimationIndex = 0;
// let animationComplete = false;

// const paths = [
//   {
//     points: [
//       new THREE.Vector3(0, 5, 0),
//       new THREE.Vector3(0, 5, 50),
//       new THREE.Vector3(-50, 5, 50),
//       new THREE.Vector3(-50, 5, -10),
//       new THREE.Vector3(-80, 10, -10),
//       new THREE.Vector3(-90, 10, -10),
//       new THREE.Vector3(-92, 5, -10),
//       new THREE.Vector3(-93, 5, -10),
//     ],
//     animationPath: 'resources/ModelGrafkom/Walking.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-93, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
      
//     ],
//     animationPath: 'resources/ModelGrafkom/Leaning.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },
  
//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 52),
//       new THREE.Vector3(-300, 5, 52),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-300, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),


//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-40, 5, 52),
//       new THREE.Vector3(-40, 5, 320),
//       new THREE.Vector3(-340, 5, 320),
//     ],
//     animationPath: 'resources/ModelGrafkom/Running.fbx'
//   },
// ];

// let currentPath = paths[currentAnimationIndex];
// let curve = new THREE.CatmullRomCurve3(currentPath.points);

// const loader = new FBXLoader();
// loader.load(currentPath.animationPath, function (object) {
//   mixer = new THREE.AnimationMixer(object);
//   const action = mixer.clipAction(object.animations[0]);
//   actions.push(action);
//   currentAction = actions[0];
//   currentAction.play();
//   object.traverse(function (child) {
//     if (child.isMesh) {
//       child.material = new THREE.MeshStandardMaterial({
//         color: child.material.color,
//         map: child.material.map,
//         normalMap: child.material.normalMap,
//         roughness: 0.8,
//         metalness: 0.2,
//       });
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });
//   scene.add(object);
//   object.position.set(0, 0, 0);
//   object.scale.setScalar(0.1);
//   orang = object;
// });

// let time_prev = 0;

// function loadNextAnimation() {
//   currentAnimationIndex++;
//   if (currentAnimationIndex >= paths.length) return;
//   currentPath = paths[currentAnimationIndex];
//   curve = new THREE.CatmullRomCurve3(currentPath.points);
//   loader.load(currentPath.animationPath, function (object) {
//     mixer.stopAllAction();
//     mixer = new THREE.AnimationMixer(object);
//     const action = mixer.clipAction(object.animations[0]);
//     actions.push(action);
//     currentAction = action;
//     currentAction.fadeIn(0.5).play();
//     object.traverse(function (child) {
//       if (child.isMesh) {
//         child.material = new THREE.MeshStandardMaterial({
//           color: child.material.color,
//           map: child.material.map,
//           normalMap: child.material.normalMap,
//           roughness: 0.8,
//           metalness: 0.2,
//         });
//         child.castShadow = true;
//         child.receiveShadow = true;
//       }
//     });
//     scene.add(object);
//     object.position.set(0, 0, 0);
//     object.scale.setScalar(0.1);
//     if (orang) scene.remove(orang);
//     orang = object;
//     progress = 0;
//     animationComplete = false;
//   });
// }

// let cameraFirstPerson, cameraThirdPerson;
// let isFirstPerson = false, isThirdPerson = false;

// function createCameras() {
//   cameraFirstPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
//   cameraThirdPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
// }

// createCameras();

// function animate(time) {
//   const dt = (time - time_prev) * 0.1;
//   const delta = clock.getDelta();
//   if (mixer) mixer.update(delta);

//   if (orang && !animationComplete) {
//     progress += speed * delta;
//     if (progress > 1) {
//       progress = 1;
//       animationComplete = true;
//       currentAction.fadeOut(0.5);
//       setTimeout(loadNextAnimation, 500);
//     }
//     const point = curve.getPointAt(progress);
//     const tangent = curve.getTangentAt(progress);
//     orang.position.copy(point);
//     orang.lookAt(point.clone().add(tangent));
//     if (currentAnimationIndex === 2) orang.rotation.set(0, Math.PI / 2, 0);
//     if (currentAnimationIndex === 3) orang.rotation.set(0, -Math.PI / 2, 0);
//     if (currentAnimationIndex === 4) orang.rotation.set(0, Math.PI / 2, 0);
//     if (isFirstPerson) {
//       cameraFirstPerson.position.copy(point.clone().add(new THREE.Vector3(0, 1.7, 0)));
//       cameraFirstPerson.rotation.copy(orang.rotation);
//       renderer.render(scene, cameraFirstPerson);
//     } else if (isThirdPerson) {
//       const offset = new THREE.Vector3(0, 10, -20).applyMatrix4(new THREE.Matrix4().makeRotationY(orang.rotation.y));
//       cameraThirdPerson.position.copy(point.clone().add(offset));
//       cameraThirdPerson.lookAt(point);
//       renderer.render(scene, cameraThirdPerson);
//     }
//   } else {
//     renderer.render(scene, camera);
//   }

//   time_prev = time;
//   requestAnimationFrame(animate);
// }

// function toggleCamera(cameraType) {
//   if (cameraType === 'first') {
//     isFirstPerson = !isFirstPerson;
//     isThirdPerson = false;
//   } else if (cameraType === 'third') {
//     isThirdPerson = !isThirdPerson;
//     isFirstPerson = false;
//   }
// }

// document.addEventListener('keydown', function (event) {
//   if (event.key === '1') {
//     toggleCamera('first');
//   } else if (event.key === '3') {
//     toggleCamera('third');
//   }
// });

// requestAnimationFrame(animate);
// }

//karakter + kamera
// {
//   let clock = new THREE.Clock();
// let mixer, orang, currentAction, actions = [];
// let progress = 0;
// const speed = 0.1;
// let currentAnimationIndex = 0;
// let animationComplete = false;

// const paths = [
//   {
//     points: [
//       new THREE.Vector3(0, 5, 0),
//       new THREE.Vector3(0, 5, 50),
//       new THREE.Vector3(-50, 5, 50),
//       new THREE.Vector3(-50, 5, -10),
//       new THREE.Vector3(-80, 10, -10),
//       new THREE.Vector3(-90, 10, -10),
//       new THREE.Vector3(-92, 5, -10),
//       new THREE.Vector3(-93, 5, -10),
//     ],
//     animationPath: 'resources/ModelGrafkom/Walking.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-93, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, -10),
      
//     ],
//     animationPath: 'resources/ModelGrafkom/Leaning.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-92.5, 5, -10),
//       new THREE.Vector3(-92.5, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 82),
//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },
  
//   {
//     points: [
//       new THREE.Vector3(-190, 5, 82),
//       new THREE.Vector3(-190, 5, 52),
//       new THREE.Vector3(-300, 5, 52),
//     ],
//     animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-300, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-320, 5, 52),


//     ],
//     animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
//   },

//   {
//     points: [
//       new THREE.Vector3(-320, 5, 52),
//       new THREE.Vector3(-40, 5, 52),
//       new THREE.Vector3(-40, 5, 320),
//       new THREE.Vector3(-340, 5, 320),
//     ],
//     animationPath: 'resources/ModelGrafkom/Running.fbx'
//   },
// ];

// let currentPath = paths[currentAnimationIndex];
// let curve = new THREE.CatmullRomCurve3(currentPath.points);

// const loader = new FBXLoader();
// loader.load(currentPath.animationPath, function (object) {
//   mixer = new THREE.AnimationMixer(object);
//   const action = mixer.clipAction(object.animations[0]);
//   actions.push(action);
//   currentAction = actions[0];
//   currentAction.play();
//   object.traverse(function (child) {
//     if (child.isMesh) {
//       child.material = new THREE.MeshStandardMaterial({
//         color: child.material.color,
//         map: child.material.map,
//         normalMap: child.material.normalMap,
//         roughness: 0.8,
//         metalness: 0.2,
//       });
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });
//   scene.add(object);
//   object.position.set(0, 0, 0);
//   object.scale.setScalar(0.1);
//   orang = object;
// });

// let time_prev = 0;

// function loadNextAnimation() {
//   currentAnimationIndex++;
//   if (currentAnimationIndex >= paths.length) return;
//   currentPath = paths[currentAnimationIndex];
//   curve = new THREE.CatmullRomCurve3(currentPath.points);
//   loader.load(currentPath.animationPath, function (object) {
//     mixer.stopAllAction();
//     mixer = new THREE.AnimationMixer(object);
//     const action = mixer.clipAction(object.animations[0]);
//     actions.push(action);
//     currentAction = action;
//     currentAction.fadeIn(0.5).play();
//     object.traverse(function (child) {
//       if (child.isMesh) {
//         child.material = new THREE.MeshStandardMaterial({
//           color: child.material.color,
//           map: child.material.map,
//           normalMap: child.material.normalMap,
//           roughness: 0.8,
//           metalness: 0.2,
//         });
//         child.castShadow = true;
//         child.receiveShadow = true;
//       }
//     });
//     scene.add(object);
//     object.position.set(0, 0, 0);
//     object.scale.setScalar(0.1);
//     if (orang) scene.remove(orang);
//     orang = object;
//     progress = 0;
//     animationComplete = false;
//   });
// }

// let cameraFirstPerson, cameraThirdPerson;
// let isFirstPerson = false, isThirdPerson = false;
// let cameraProgress = 0; // Progress along the curve for the camera
// const cameraCurve = new THREE.CatmullRomCurve3([
//   // Define camera path points here
//   new THREE.Vector3(0, 10, -20),
//   new THREE.Vector3(50, 20, -40),
//   new THREE.Vector3(100, 30, -60),
//   new THREE.Vector3(150, 40, -80),
//   // Add more points as needed
// ]);

// function createCameras() {
//   cameraFirstPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
//   cameraThirdPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
// }

// createCameras();

// function animate(time) {
//   const dt = (time - time_prev) * 0.1;
//   const delta = clock.getDelta();
//   if (mixer) mixer.update(delta);

//   if (orang && !animationComplete) {
//     progress += speed * delta;
//     if (progress > 1) {
//       progress = 1;
//       animationComplete = true;
//       currentAction.fadeOut(0.5);
//       setTimeout(loadNextAnimation, 500);
//     }
//     const point = curve.getPointAt(progress);
//     const tangent = curve.getTangentAt(progress);
//     orang.position.copy(point);
//     orang.lookAt(point.clone().add(tangent));
//     if (currentAnimationIndex === 2) orang.rotation.set(0, Math.PI / 2, 0);
//     if (currentAnimationIndex === 3) orang.rotation.set(0, -Math.PI / 2, 0);
//     if (currentAnimationIndex === 4) orang.rotation.set(0, Math.PI / 2, 0);

//     if (isFirstPerson) {
//       cameraFirstPerson.position.copy(point.clone().add(new THREE.Vector3(0, 1.7, 0)));
//       cameraFirstPerson.rotation.copy(orang.rotation);
//       renderer.render(scene, cameraFirstPerson);
//     } else if (isThirdPerson) {
//       cameraProgress += speed * delta;
//       if (cameraProgress > 1) cameraProgress = 1; // Reset or loop camera progress as needed
//       const cameraPoint = cameraCurve.getPointAt(cameraProgress);
//       const cameraTangent = cameraCurve.getTangentAt(cameraProgress);
//       const offset = new THREE.Vector3(0, 10, -20).applyMatrix4(new THREE.Matrix4().makeRotationY(orang.rotation.y));
//       cameraThirdPerson.position.copy(cameraPoint.clone().add(offset));
//       cameraThirdPerson.lookAt(cameraPoint.clone().add(cameraTangent));
//       renderer.render(scene, cameraThirdPerson);
//     }
//   } else {
//     renderer.render(scene, camera);
//   }

//   time_prev = time;
//   requestAnimationFrame(animate);
// }

// function toggleCamera(cameraType) {
//   if (cameraType === 'first') {
//     isFirstPerson = !isFirstPerson;
//     isThirdPerson = false;
//   } else if (cameraType === 'third') {
//     isThirdPerson = !isThirdPerson;
//     isFirstPerson = false;
//   }
// }

// document.addEventListener('keydown', function (event) {
//   if (event.key === '1') {
//     toggleCamera('first');
//   } else if (event.key === '3') {
//     toggleCamera('third');
//   }
// });

// requestAnimationFrame(animate);
// }

{
let clock = new THREE.Clock();
let mixer, orang, currentAction, actions = [];
let progress = 0;
const speed = 0.1;
let currentAnimationIndex = 0;
let animationComplete = false;

const paths = [
  {
    points: [
      new THREE.Vector3(0, 5, 0),
      new THREE.Vector3(0, 5, 50),
      new THREE.Vector3(-50, 5, 50),
      new THREE.Vector3(-50, 5, -10),
      new THREE.Vector3(-80, 10, -10),
      new THREE.Vector3(-90, 10, -10),
      new THREE.Vector3(-92, 5, -10),
      new THREE.Vector3(-93, 5, -10),
    ],
    animationPath: 'resources/ModelGrafkom/Walking.fbx'
  },

  {
    points: [
      new THREE.Vector3(-93, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, -10),
      
    ],
    animationPath: 'resources/ModelGrafkom/Leaning.fbx'
  },

  {
    points: [
      new THREE.Vector3(-92.5, 5, -10),
      new THREE.Vector3(-92.5, 5, 82),
      new THREE.Vector3(-190, 5, 82),
    ],
    animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
  },

  {
    points: [
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 82),
    ],
    animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
  },
  
  {
    points: [
      new THREE.Vector3(-190, 5, 82),
      new THREE.Vector3(-190, 5, 52),
      new THREE.Vector3(-300, 5, 52),
    ],
    animationPath: 'resources/ModelGrafkom/Crouched Sneaking Right.fbx'
  },

  {
    points: [
      new THREE.Vector3(-300, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-320, 5, 52),


    ],
    animationPath: 'resources/ModelGrafkom/Old Man Idle.fbx'
  },

  {
    points: [
      new THREE.Vector3(-320, 5, 52),
      new THREE.Vector3(-40, 5, 52),
      new THREE.Vector3(-40, 5, 320),
      new THREE.Vector3(-340, 5, 320),
    ],
    animationPath: 'resources/ModelGrafkom/Running.fbx'
  },
];

let currentPath = paths[currentAnimationIndex];
let curve = new THREE.CatmullRomCurve3(currentPath.points);

const loader = new FBXLoader();
loader.load(currentPath.animationPath, function (object) {
  mixer = new THREE.AnimationMixer(object);
  const action = mixer.clipAction(object.animations[0]);
  actions.push(action);
  currentAction = actions[0];
  currentAction.play();
  object.traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: child.material.color,
        map: child.material.map,
        normalMap: child.material.normalMap,
        roughness: 0.8,
        metalness: 0.2,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(object);
  object.position.set(0, 0, 0);
  object.scale.setScalar(0.1);
  orang = object;
});

let time_prev = 0;

function loadNextAnimation() {
  currentAnimationIndex++;
  if (currentAnimationIndex >= paths.length) return;
  currentPath = paths[currentAnimationIndex];
  curve = new THREE.CatmullRomCurve3(currentPath.points);
  loader.load(currentPath.animationPath, function (object) {
    mixer.stopAllAction();
    mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(object.animations[0]);
    actions.push(action);
    currentAction = action;
    currentAction.fadeIn(0.5).play();
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          map: child.material.map,
          normalMap: child.material.normalMap,
          roughness: 0.8,
          metalness: 0.2,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(object);
    object.position.set(0, 0, 0);
    object.scale.setScalar(0.1);
    if (orang) scene.remove(orang);
    orang = object;
    progress = 0;
    animationComplete = false;
  });
}

let cameraFirstPerson, cameraThirdPerson;
let isFirstPerson = false, isThirdPerson = false;
let cameraProgress = 0;
const cameraCurve = new THREE.CatmullRomCurve3([
  // new THREE.Vector3(0, 10, -20),
  // new THREE.Vector3(50, 20, -40),
  // new THREE.Vector3(100, 30, -60),
  // new THREE.Vector3(150, 40, -80),

  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(0, 10, 50),
  new THREE.Vector3(-50, 10, 50),
  new THREE.Vector3(-50, 10, -10),
  new THREE.Vector3(-50, 10, -10),
  new THREE.Vector3(-50, 10, -10),
  new THREE.Vector3(-50, 10, -10),
  new THREE.Vector3(-50, 10, -10),

]);

function createCameras() {
  cameraFirstPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  cameraThirdPerson = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
}

createCameras();

function animate(time) {
  const dt = (time - time_prev) * 0.1;
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (orang && !animationComplete) {
    progress += speed * delta;
    if (progress > 1) {
      progress = 1;
      animationComplete = true;
      currentAction.fadeOut(0.5);
      setTimeout(loadNextAnimation, 500);
    }
    const point = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress);
    orang.position.copy(point);
    orang.lookAt(point.clone().add(tangent));
    if (currentAnimationIndex === 2) orang.rotation.set(0, Math.PI / 2, 0);
    if (currentAnimationIndex === 3) orang.rotation.set(0, -Math.PI / 2, 0);
    if (currentAnimationIndex === 4) orang.rotation.set(0, Math.PI / 2, 0);

    if (isFirstPerson) {
      const offset = new THREE.Vector3(-3, 16, -3); // atur posisi
      const firstPersonPosition = point.clone().add(offset);
      cameraFirstPerson.position.copy(firstPersonPosition);
      cameraFirstPerson.rotation.copy(orang.rotation);

      const additionalRotation = new THREE.Euler(0, Math.PI, 0); // derajat
      cameraFirstPerson.rotation.x += additionalRotation.x;
      cameraFirstPerson.rotation.y += additionalRotation.y;
      cameraFirstPerson.rotation.z += additionalRotation.z;

      renderer.render(scene, cameraFirstPerson);
    } else if (isThirdPerson) {
      cameraProgress += speed * delta;
      if (cameraProgress > 1) cameraProgress = 1; 
      const cameraPoint = cameraCurve.getPointAt(cameraProgress);
      const cameraTangent = cameraCurve.getTangentAt(cameraProgress);
      const offset = new THREE.Vector3(0, 10, -20).applyMatrix4(new THREE.Matrix4().makeRotationY(orang.rotation.y));
      cameraThirdPerson.position.copy(cameraPoint.clone().add(offset));
      cameraThirdPerson.lookAt(cameraPoint.clone().add(cameraTangent));
      renderer.render(scene, cameraThirdPerson);
    } else {
      renderer.render(scene, camera);
    }
  }

  time_prev = time;
  requestAnimationFrame(animate);
}

document.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    isFirstPerson = !isFirstPerson;
    isThirdPerson = false;
  } else if (event.key === '3') {
    isThirdPerson = !isThirdPerson;
    isFirstPerson = false;
  }
});

requestAnimationFrame(animate);
}


//error
// {
// //code siang malam
// {
// // Sun Light 
// const sunLight = new THREE.DirectionalLight(0xffffff, 1);
// sunLight.position.set(100, 100, 100);
// sunLight.castShadow = true;
// sunLight.shadow.mapSize.width = 2048;
// sunLight.shadow.mapSize.height = 2048;
// sunLight.shadow.camera.near = 0.1;
// sunLight.shadow.camera.far = 1000;
// scene.add(sunLight);

// // Moon Light 
// const moonLight = new THREE.DirectionalLight(0x8888ff, 0.5);
// moonLight.position.set(-100, -100, -100);
// moonLight.castShadow = true;
// moonLight.shadow.mapSize.width = 2048;
// moonLight.shadow.mapSize.height = 2048;
// moonLight.shadow.camera.near = 0.1;
// moonLight.shadow.camera.far = 1000;
// scene.add(moonLight);

// const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
// scene.add(ambientLight);

// const skybox = new THREE.Mesh(
//     new THREE.SphereGeometry(5000, 32, 32),
//     new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide })
// );
// scene.add(skybox);

// const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
// const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);

// const moonGeometry = new THREE.SphereGeometry(20, 32, 32);
// const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
// const moon = new THREE.Mesh(moonGeometry, moonMaterial);
// scene.add(moon);
// }

// //animasi siang malam
// {
//   let time_prev = 0;
//   let cycleDuration = 20000; 
  
//   function animate(time) {
//       let dt = time - time_prev;
//       dt *= 0.1;
  
//       objects.forEach((obj) => {
//           obj.rotation.z += dt * 0.01;
//       });
  
//       let cycleProgress = (time % cycleDuration) / cycleDuration;
  
//       let sunAngle = cycleProgress * Math.PI * 2; 
//       sun.position.set(200 * Math.cos(sunAngle), 200 * Math.sin(sunAngle), 0);
//       sunLight.position.copy(sun.position);
  
//       let moonAngle = sunAngle + Math.PI; 
//       moon.position.set(200 * Math.cos(moonAngle), 200 * Math.sin(moonAngle), 0);
//       moonLight.position.copy(moon.position);
  
//       if (cycleProgress < 0.25) {
//           // Dawn
//           let transitionProgress = cycleProgress / 0.25;
//           skybox.material.color.setHSL(0.6, 0.8 * transitionProgress, 0.6 * transitionProgress + 0.2);
//           sunLight.intensity = transitionProgress;
//           moonLight.intensity = 1 - transitionProgress;
//           ambientLight.intensity = 0.25 + 0.25 * transitionProgress;
//       } else if (cycleProgress < 0.5) {
//           // Day
//           skybox.material.color.setHSL(0.6, 0.8, 0.8);
//           sunLight.intensity = 1;
//           moonLight.intensity = 0;
//           ambientLight.intensity = 0.5;
//       } else if (cycleProgress < 0.75) {
//           // Dusk
//           let transitionProgress = (cycleProgress - 0.5) / 0.25;
//           skybox.material.color.setHSL(0.6, 0.8 * (1 - transitionProgress), 0.6 * (1 - transitionProgress) + 0.2);
//           sunLight.intensity = 1 - transitionProgress;
//           moonLight.intensity = transitionProgress;
//           ambientLight.intensity = 0.5 - 0.25 * transitionProgress;
//       } else {
//           // Night
//           let transitionProgress = (cycleProgress - 0.75) / 0.25;
//           skybox.material.color.setHSL(0.6, 0.2 * (1 - transitionProgress), 0.2 * (1 - transitionProgress) + 0.2);
//           sunLight.intensity = 0;
//           moonLight.intensity = 1;
//           ambientLight.intensity = 0.25;
//       }
  
//       renderer.render(scene, camera);
  
//       time_prev = time;
//       requestAnimationFrame(animate);
//   }
//   requestAnimationFrame(animate);
  
//   window.addEventListener('resize', () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//   });
// }

// console.log("Initial setup complete");
// console.log("Renderer: ", renderer);
// console.log("Scene: ", scene);
// console.log("Camera: ", camera);
// console.log("Sun: ", sun);
// console.log("Moon: ", moon);
// console.log("SunLight: ", sunLight);
// console.log("MoonLight: ", moonLight);
// console.log("AmbientLight: ", ambientLight);
// console.log("Skybox: ", skybox);

// }