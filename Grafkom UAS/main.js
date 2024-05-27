import * as THREE from 'three';
// import { add } from 'three/examples/jsm/libs/tween.module.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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

// controls.minDistance = 50;  // Minimum zoom distance
// controls.maxDistance = 2000; // Maximum zoom distance
// controls.zoomSpeed = 1.0; // Zoom speed

//Light
{
// direction light
var light = new THREE.DirectionalLight(0xFFFFFF,10);
light.position.set(0,10,0);
light.target.position.set(-5,0,0);
scene.add(light);
scene.add(light.target);

//Hemisphere light
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
{


// //plane
// {
// var planeGeo = new THREE.PlaneGeometry(40,40);
// var planeMat = new THREE.MeshPhongMaterial({
//   color : 0x888888,
//   side : THREE.DoubleSide
// });
// var mesh = new THREE.Mesh(planeGeo,planeMat);
// mesh.rotation.x = Math.PI * -0.5;
// scene.add(mesh);
// }

// //cube
// {
// var cubeGeo = new THREE.BoxGeometry(4,4,4);
// var cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
// var mesh = new THREE.Mesh(cubeGeo,cubeMat);
// mesh.position.set(5,3.5,0);
// scene.add(mesh);
// }


// //sphere
// {
// var sphereGeo = new THREE.SphereGeometry(3,32,16);
// var sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
// var mesh = new THREE.Mesh(sphereGeo,sphereMat);
// mesh.position.set(-4,5,0);
// scene.add(mesh);
// }
}
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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

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

          scene.add( object );

        }, onProgress );

    } );
}

//container
{
  new MTLLoader()
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

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()
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

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()
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

        scene.add( object );

      }, onProgress );

  } );

  new MTLLoader()
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

        scene.add( object );

      }, onProgress );

  } );
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
  
          scene.add( object );
  
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
  
          scene.add( object );
  
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


{
// const loader = new GLTFLoader().setPath( 'resources/ModelGrafkom/' );
// loader.load( 'chloe.glb', function ( gltf ) {

//   const model = gltf.scene;

//   // wait until the model can be added to the scene without blocking due to shader compilation

//   model.position.set(0,10,0);
//   renderer.compileAsync( model, camera, scene );

//   scene.add( model );


// } );
}

//char
{
  const clock = new THREE.Clock();
  let mixer;
  let orang;

  const loader = new FBXLoader();
  loader.load( 'resources/ModelGrafkom/Walking.fbx', function ( object ) {

    mixer = new THREE.AnimationMixer( object );

    const action = mixer.clipAction( object.animations[ 0 ] );
    action.play();

    object.traverse( function ( child ) {

      if ( child.isMesh ) {

        child.castShadow = true;
        child.receiveShadow = true;

      }

    } );

    scene.add( object );

    object.position.x = -8;
    object.position.y = 5;
    object.position.z = -70;
    object.scale.setScalar(0.1);

    orang = object;

  } );

  // Animation function
  let time_prev = 0;
  function animate(time) {
    const dt = (time - time_prev) * 0.1;

    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );

    if (orang) {
      orang.position.z += 0.1 * dt;
    }

    renderer.render(scene, camera);
    time_prev = time;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

}
 
var time_prev = 0;
function animate(time){
    var dt = time - time_prev;
    dt *= 0.1;

    objects.forEach((obj)=>{
      obj.rotation.z += dt * 0.01;
    })

    // cube.rotation.x += 0.01 * dt;
    // cube.rotation.y += 0.01 * dt;

    renderer.render(scene, camera);

    time_prev = time;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
