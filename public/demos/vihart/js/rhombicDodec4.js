// 	Schlafli symbol {4,3,6} is cubes with 6 around each edge

function acosh(arg) {
  //  discuss at: http://phpjs.org/functions/acosh/
  // original by: Onno Marsman
  //   example 1: acosh(8723321.4);
  //   returns 1: 16.674657798418625

  return Math.log(arg + Math.sqrt(arg * arg - 1));
}

var dist = 2*acosh( Math.sqrt(2) );

var diag = dist / Math.sqrt(2);

var diagBy2 = diag * 0.5;

var reflXY = new THREE.Matrix4().set( 0,1,0,0,
									  1,0,0,0,
									  0,0,1,0,
									  0,0,0,1	);
var reflXY2 = new THREE.Matrix4().set( 0,-1,0,0,
									  -1,0,0,0,
									  0,0,1,0,
									  0,0,0,1	);
var reflYZ = new THREE.Matrix4().set( 1,0,0,0,
									  0,0,1,0,
									  0,1,0,0,
									  0,0,0,1	);
var reflYZ2 = new THREE.Matrix4().set( 1,0,0,0,
									  0,0,-1,0,
									  0,-1,0,0,
									  0,0,0,1	);
var reflZX = new THREE.Matrix4().set( 0,0,1,0,
									  0,1,0,0,
									  1,0,0,0,
									  0,0,0,1	);
var reflZX2 = new THREE.Matrix4().set( 0,0,-1,0,
									  0,1,0,0,
									  -1,0,0,0,
									  0,0,0,1	);

//use translateByVector from VRControlsHyperbolic.js

var tilingGens =  //reflect
[
new THREE.Matrix4(),  //id matrix

translateByVector(new THREE.Vector3(diag,diag,0)).multiply(new THREE.Matrix4().copy(reflXY2)) , 
translateByVector(new THREE.Vector3(-diag,diag,0)).multiply(new THREE.Matrix4().copy(reflXY)) , 
translateByVector(new THREE.Vector3(diag,-diag,0)).multiply(new THREE.Matrix4().copy(reflXY)) , 
translateByVector(new THREE.Vector3(-diag,-diag,0)).multiply(new THREE.Matrix4().copy(reflXY2)), 

translateByVector(new THREE.Vector3(0,diag,diag)).multiply(new THREE.Matrix4().copy(reflYZ2)) , 
translateByVector(new THREE.Vector3(0,-diag,diag)).multiply(new THREE.Matrix4().copy(reflYZ)) , 
translateByVector(new THREE.Vector3(0,diag,-diag)).multiply(new THREE.Matrix4().copy(reflYZ)) , 
translateByVector(new THREE.Vector3(0,-diag,-diag)).multiply(new THREE.Matrix4().copy(reflYZ2)), 

translateByVector(new THREE.Vector3(diag,0,diag)).multiply(new THREE.Matrix4().copy(reflZX2)) , 
translateByVector(new THREE.Vector3(-diag,0,diag)).multiply(new THREE.Matrix4().copy(reflZX)) , 
translateByVector(new THREE.Vector3(diag,0,-diag)).multiply(new THREE.Matrix4().copy(reflZX)) , 
translateByVector(new THREE.Vector3(-diag,0,-diag)).multiply(new THREE.Matrix4().copy(reflZX2)) 

];


// var tilingGens =  //translate
// [
// new THREE.Matrix4(),  //id matrix
// translateByVector(new THREE.Vector3(diag,diag,0)) ,
// translateByVector(new THREE.Vector3(-diag,diag,0)) ,
// translateByVector(new THREE.Vector3(diag,-diag,0)) ,
// translateByVector(new THREE.Vector3(-diag,-diag,0)) ,

// translateByVector(new THREE.Vector3(diag,0,diag)) ,
// translateByVector(new THREE.Vector3(-diag,0,diag)) ,
// translateByVector(new THREE.Vector3(diag,0,-diag)) ,
// translateByVector(new THREE.Vector3(-diag,0,-diag)) ,

// translateByVector(new THREE.Vector3(0,diag,diag)) ,
// translateByVector(new THREE.Vector3(0,-diag,diag)) ,
// translateByVector(new THREE.Vector3(0,diag,-diag)) ,
// translateByVector(new THREE.Vector3(0,-diag,-diag)) 

// ];






