
var centers_5_cell = [
    new THREE.Vector4(-1.0,-1.0,-1.0,-1.0/Math.sqrt(5.0)),
    new THREE.Vector4(-1.0, 1.0, 1.0,-1.0/Math.sqrt(5.0)),
    new THREE.Vector4( 1.0,-1.0, 1.0,-1.0/Math.sqrt(5.0)),
    new THREE.Vector4( 1.0, 1.0,-1.0,-1.0/Math.sqrt(5.0)),
    new THREE.Vector4( 0.0, 0.0, 0.0, Math.sqrt(5.0)-1.0/Math.sqrt(5.0))
];
for (var i=0;i<5;i++){
  centers_5_cell[i].multiplyScalar(1.0/(Math.sqrt(5.0)-1.0/Math.sqrt(5.0)));
}

var centers_5_cell_dual = [];
for (var i=0;i<5;i++){
  centers_5_cell_dual[i] = new THREE.Vector4().copy(centers_5_cell[i]).negate();
}
