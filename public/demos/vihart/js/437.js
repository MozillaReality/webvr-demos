// 	Schlafli symbol {4,3,6} is cubes with 6 around each edge

function acosh(arg) {
  //  discuss at: http://phpjs.org/functions/acosh/
  // original by: Onno Marsman
  //   example 1: acosh(8723321.4);
  //   returns 1: 16.674657798418625

  return Math.log(arg + Math.sqrt(arg * arg - 1));
}

// var dist = 2*acosh( Math.sqrt(1.5) )
var dist = 2*0.724537;

//use translateByVector from VRControlsHyperbolic.js



var tilingGens =
[
new THREE.Matrix4(),  //id matrix
translateByVector(new THREE.Vector3(dist,0,0) ),
translateByVector(new THREE.Vector3(-dist,0,0) ),
translateByVector(new THREE.Vector3(0,dist,0) ),
translateByVector(new THREE.Vector3(0,-dist,0) ),
translateByVector(new THREE.Vector3(0,0,dist) ),
translateByVector(new THREE.Vector3(0,0,-dist) )
];



