var centers_16_cell_vert_centered = [];

for (var i=0;i<2;i++){
  for (var j=0;j<2;j++){
    for (var k=0;k<2;k++){
      for (var l=0;l<2;l++){
        centers_16_cell_vert_centered[centers_16_cell_vert_centered.length] = new THREE.Vector4((1 - 2*i)*0.5,(1 - 2*j)*0.5,(1 - 2*k)*0.5,(1 - 2*l)*0.5);
      }
    }
  }
}

///////move one cell to (0,0,0,1)  (makes it no longer dual to 8-cell)
var centers_16_cell = [];
var offset = new THREE.Vector4(0.5,0.5,0.5,0.5);
for (var i=0;i<16;i++){
  centers_16_cell[i] = quatMult(offset, centers_16_cell_vert_centered[i]);
}

