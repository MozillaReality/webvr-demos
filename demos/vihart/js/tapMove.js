//tap to move, speed based on how high on the screen you tap.
//meant for a THREEjs camera in phone VR.
//Vi Hart, eleVR.com

var moveSpeed = 0; //default move speed is 0

document.body.addEventListener( 'click', function(event) { // on click:
	var mouseY = event.clientY; //get Y position
	moveSpeed = (1 - mouseY/window.innerHeight); //get click height in proportion to window height
	if (moveSpeed < .1){ //if it's very slow, call it stopped, to avoid drift.
		moveSpeed = 0;
	}
});

function tapMovement(speedScale) { //call this once per frame to move camera.
		var moveVector = new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion); //get camera facing as vector
		var moveAmount = moveVector.multiplyScalar(moveSpeed*speedScale*0.1); //vector scaled according to mouse height and factor set in other file
		camera.position.sub(moveAmount); //move camera position by that vector
}

//that was shorter and easier than I expected...