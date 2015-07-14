

var GoldenRatio = (1 + Math.sqrt(5))*0.5;

var centers_120_cell = [
new THREE.Vector4(0,0,0,2), //center

new THREE.Vector4(1,0,(1/GoldenRatio),GoldenRatio),
new THREE.Vector4(-1,0,(-1/GoldenRatio),GoldenRatio),
new THREE.Vector4(1,0,(-1/GoldenRatio),GoldenRatio),
new THREE.Vector4(-1,0,(1/GoldenRatio),GoldenRatio),

new THREE.Vector4((1/GoldenRatio),1,0,GoldenRatio), 
new THREE.Vector4((-1/GoldenRatio),-1,0,GoldenRatio),
new THREE.Vector4((-1/GoldenRatio),1,0,GoldenRatio),  
new THREE.Vector4((1/GoldenRatio),-1,0,GoldenRatio),

new THREE.Vector4(0,(1/GoldenRatio),1,GoldenRatio),
new THREE.Vector4(0,(-1/GoldenRatio),-1,GoldenRatio),
new THREE.Vector4(0,(-1/GoldenRatio),1,GoldenRatio),
new THREE.Vector4(0,(1/GoldenRatio),-1,GoldenRatio),

new THREE.Vector4(2,0,0,0),new THREE.Vector4(-2,0,0,0),new THREE.Vector4(0,2,0,0),new THREE.Vector4(0,-2,0,0),new THREE.Vector4(0,0,2,0),new THREE.Vector4(0,0,-2,0),new THREE.Vector4(0,0,0,-2),

new THREE.Vector4(1,1,1,1),new THREE.Vector4(1,1,1,-1),new THREE.Vector4(1,1,-1,1),new THREE.Vector4(1,1,-1,-1),new THREE.Vector4(1,-1,1,1),new THREE.Vector4(1,-1,1,-1),new THREE.Vector4(1,-1,-1,1),new THREE.Vector4(1,-1,-1,-1),
new THREE.Vector4(-1,1,1,1),new THREE.Vector4(-1,1,1,-1),new THREE.Vector4(-1,1,-1,1),new THREE.Vector4(-1,1,-1,-1),new THREE.Vector4(-1,-1,1,1),new THREE.Vector4(-1,-1,1,-1),new THREE.Vector4(-1,-1,-1,1),new THREE.Vector4(-1,-1,-1,-1),
new THREE.Vector4(GoldenRatio,1,(1/GoldenRatio),0), new THREE.Vector4(GoldenRatio,(1/GoldenRatio),0,1), new THREE.Vector4(GoldenRatio,0,1,(1/GoldenRatio)), new THREE.Vector4(1,GoldenRatio,0,(1/GoldenRatio)), new THREE.Vector4(1,(1/GoldenRatio),GoldenRatio,0), new THREE.Vector4((1/GoldenRatio),GoldenRatio,1,0), new THREE.Vector4((1/GoldenRatio),0,GoldenRatio,1), new THREE.Vector4(0,GoldenRatio,(1/GoldenRatio),1), new THREE.Vector4(0,1,GoldenRatio,(1/GoldenRatio)),
new THREE.Vector4(-GoldenRatio,1,(1/GoldenRatio),0), new THREE.Vector4(-GoldenRatio,(1/GoldenRatio),0,1), new THREE.Vector4(-GoldenRatio,0,1,(1/GoldenRatio)), new THREE.Vector4(1,-GoldenRatio,0,(1/GoldenRatio)), new THREE.Vector4(1,(1/GoldenRatio),-GoldenRatio,0), new THREE.Vector4(1,0,(1/GoldenRatio),-GoldenRatio), new THREE.Vector4((1/GoldenRatio),-GoldenRatio,1,0), new THREE.Vector4((1/GoldenRatio),1,0,-GoldenRatio), new THREE.Vector4((1/GoldenRatio),0,-GoldenRatio,1), new THREE.Vector4(0,-GoldenRatio,(1/GoldenRatio),1), new THREE.Vector4(0,1,-GoldenRatio,(1/GoldenRatio)), new THREE.Vector4(0,(1/GoldenRatio),1,-GoldenRatio),
new THREE.Vector4(GoldenRatio,-1,(1/GoldenRatio),0), new THREE.Vector4(GoldenRatio,(1/GoldenRatio),0,-1), new THREE.Vector4(GoldenRatio,0,-1,(1/GoldenRatio)), new THREE.Vector4(-1,GoldenRatio,0,(1/GoldenRatio)), new THREE.Vector4(-1,(1/GoldenRatio),GoldenRatio,0), new THREE.Vector4((1/GoldenRatio),GoldenRatio,-1,0), new THREE.Vector4((1/GoldenRatio),0,GoldenRatio,-1), new THREE.Vector4(0,GoldenRatio,(1/GoldenRatio),-1), new THREE.Vector4(0,-1,GoldenRatio,(1/GoldenRatio)), 
new THREE.Vector4(-GoldenRatio,-1,(1/GoldenRatio),0), new THREE.Vector4(-GoldenRatio,(1/GoldenRatio),0,-1), new THREE.Vector4(-GoldenRatio,0,-1,(1/GoldenRatio)), new THREE.Vector4(-1,-GoldenRatio,0,(1/GoldenRatio)), new THREE.Vector4(-1,(1/GoldenRatio),-GoldenRatio,0), new THREE.Vector4(-1,0,(1/GoldenRatio),-GoldenRatio), new THREE.Vector4((1/GoldenRatio),-GoldenRatio,-1,0), new THREE.Vector4((1/GoldenRatio),-1,0,-GoldenRatio), new THREE.Vector4((1/GoldenRatio),0,-GoldenRatio,-1), new THREE.Vector4(0,-GoldenRatio,(1/GoldenRatio),-1), new THREE.Vector4(0,-1,-GoldenRatio,(1/GoldenRatio)), new THREE.Vector4(0,(1/GoldenRatio),-1,-GoldenRatio),
new THREE.Vector4(GoldenRatio,1,(-1/GoldenRatio),0), new THREE.Vector4(GoldenRatio,(-1/GoldenRatio),0,1), new THREE.Vector4(GoldenRatio,0,1,(-1/GoldenRatio)), new THREE.Vector4(1,GoldenRatio,0,(-1/GoldenRatio)), new THREE.Vector4(1,(-1/GoldenRatio),GoldenRatio,0), new THREE.Vector4((-1/GoldenRatio),GoldenRatio,1,0), new THREE.Vector4((-1/GoldenRatio),0,GoldenRatio,1), new THREE.Vector4(0,GoldenRatio,(-1/GoldenRatio),1), new THREE.Vector4(0,1,GoldenRatio,(-1/GoldenRatio)), 
new THREE.Vector4(-GoldenRatio,1,(-1/GoldenRatio),0), new THREE.Vector4(-GoldenRatio,(-1/GoldenRatio),0,1), new THREE.Vector4(-GoldenRatio,0,1,(-1/GoldenRatio)), new THREE.Vector4(1,-GoldenRatio,0,(-1/GoldenRatio)), new THREE.Vector4(1,(-1/GoldenRatio),-GoldenRatio,0), new THREE.Vector4(1,0,(-1/GoldenRatio),-GoldenRatio), new THREE.Vector4((-1/GoldenRatio),-GoldenRatio,1,0), new THREE.Vector4((-1/GoldenRatio),1,0,-GoldenRatio), new THREE.Vector4((-1/GoldenRatio),0,-GoldenRatio,1), new THREE.Vector4(0,-GoldenRatio,(-1/GoldenRatio),1), new THREE.Vector4(0,1,-GoldenRatio,(-1/GoldenRatio)), new THREE.Vector4(0,(-1/GoldenRatio),1,-GoldenRatio),
new THREE.Vector4(GoldenRatio,-1,(-1/GoldenRatio),0), new THREE.Vector4(GoldenRatio,(-1/GoldenRatio),0,-1), new THREE.Vector4(GoldenRatio,0,-1,(-1/GoldenRatio)), new THREE.Vector4(-1,GoldenRatio,0,(-1/GoldenRatio)), new THREE.Vector4(-1,(-1/GoldenRatio),GoldenRatio,0), new THREE.Vector4((-1/GoldenRatio),GoldenRatio,-1,0), new THREE.Vector4((-1/GoldenRatio),0,GoldenRatio,-1), new THREE.Vector4(0,GoldenRatio,(-1/GoldenRatio),-1), new THREE.Vector4(0,-1,GoldenRatio,(-1/GoldenRatio)), 
new THREE.Vector4(-GoldenRatio,-1,(-1/GoldenRatio),0), new THREE.Vector4(-GoldenRatio,(-1/GoldenRatio),0,-1), new THREE.Vector4(-GoldenRatio,0,-1,(-1/GoldenRatio)), new THREE.Vector4(-1,-GoldenRatio,0,(-1/GoldenRatio)), new THREE.Vector4(-1,(-1/GoldenRatio),-GoldenRatio,0), new THREE.Vector4(-1,0,(-1/GoldenRatio),-GoldenRatio), new THREE.Vector4((-1/GoldenRatio),-GoldenRatio,-1,0), new THREE.Vector4((-1/GoldenRatio),-1,0,-GoldenRatio), new THREE.Vector4((-1/GoldenRatio),0,-GoldenRatio,-1), new THREE.Vector4(0,-GoldenRatio,(-1/GoldenRatio),-1), new THREE.Vector4(0,-1,-GoldenRatio,(-1/GoldenRatio)), new THREE.Vector4(0,(-1/GoldenRatio),-1,-GoldenRatio)
];

for (var i=0;i<120;i++){
	centers_120_cell[i].multiplyScalar(0.5);
	// console.log(centers_120_cell[i].length());
}





