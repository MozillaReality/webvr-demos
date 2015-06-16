Math.TAU = 2*Math.PI;

//////////////////////////////////////////////////////
// SET UP EVERYTHING
//////////////////////////////////////////////////////

var renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
renderer.setClearColor( 0xFFFFFF, 1 ); // the default
renderer.sortObjects = false;
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.y = 75;
var controls = new THREE.VRControls(camera);
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
var vrmgr = new WebVRManager(renderer, effect);

//////////////////////////////////////////////////////
// CONVERT TO 2.5D SCENE
//////////////////////////////////////////////////////

var sprites = [];

var loader = new createjs.LoadQueue(false);
loader.installPlugin(createjs.Sound);
loader.addEventListener("complete", handleComplete);
//createjs.Sound.alternateExtensions = ["ogg"];

function handleComplete(){

	root = new lib.act_i_canvas();
	root.isSprite = true;

	stage = new createjs.Stage();
	stage.addChild(root);
	stage._tick();

	// All of root's current & future children, unless they're guides. (prefix: "_")
	// hack - children detected with this property: nominalBounds
	for(var propName in root){
		var prop = root[propName];
		if(!prop || !prop.nominalBounds || propName.charAt(0)=="_") continue;
		var mc = prop;
		var sprite = new CanvasSprite(mc);
		scene.add(sprite.mesh);
		sprites.push(sprite);
	}

	// ANIMATE
	createjs.Ticker.setPaused(true);
	window.musicInstance = createjs.Sound.play("intro",{
		//offset:30000
	});
	window.musicInstance.pause();
	window.musicInstance.addEventListener("complete", function(){
		window.ANIMATION_OVER = true;
	});
	
	setTimeout(function(){
		window.musicInstance.play();
		animate();
		document.getElementById("loading").style.display = "none";
	},1000);

}

function sortSprites(sprites){

	// Manual sorting of sprites, in ascending order
	// Remember, if a<b return negative. if a>b return postive.
	sprites.sort(function(a,b){

		// Get the sprite from mesh
		a = a.canvasSprite;
		b = b.canvasSprite;

		// Is it a floor?
		if(a.floor && !b.floor) return -1;
		if(!a.floor && b.floor) return 1;
		if(a.floor && b.floor){
			return a.y-b.y;
		}
		if(!a.floor && !b.floor){
			// calculate relative distance from you
			var a_dx = a.mc.x - root._stage.x;
			var a_dy = a.mc.y - root._stage.y;
			var a_dist = a_dx*a_dx + a_dy*a_dy;
			var b_dx = b.mc.x - root._stage.x;
			var b_dy = b.mc.y - root._stage.y;
			var b_dist = b_dx*b_dx + b_dy*b_dy;
			return b_dist-a_dist; // closer one, SMALLER distance, should be ahead
		}


	});

	return sprites;

}

function debug(){
	for(var i=0;i<sprites.length;i++){
		console.log(sprites[i].mc);
	}
}

// This is a super-simplistic pan
// It only takes into account your Y-rotation
// Whatever

function getSoundPan(mc){

	var pLocal = new THREE.Vector3( 0, 0, -1 );
	var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
	var direction = pWorld.sub(camera.position).normalize();
	var camAngle = Math.atan2(direction.z,direction.x);

	var x = mc.x - root._stage.x;
	var y = mc.y - root._stage.y;
	var sourceAngle = Math.atan2(y,x);

	var angle = sourceAngle-camAngle;
	var pan = Math.sin(angle);

	return pan;
}

var soundObjects = [];
function playSFX(id, mc) {

	var soundInstance = createjs.Sound.play(id, {
		interrupt: createjs.Sound.INTERRUPT_EARLY,
		delay: 0,
		offset: 0,
		loop: 0,
		volume: mc.scaleX, // scale for volume, how cute! <3
		pan: getSoundPan(mc)
	});

	var soundObject = { mc:mc, soundInstance:soundInstance };

	soundObjects.push(soundObject);
	soundInstance.addEventListener("complete", function(){
		var i = soundObjects.indexOf(soundObject);
		if(i<0) return;
		soundObjects.splice(i,1);
	});

}
function setBackground(color){
	renderer.setClearColor(color,1);
}
function playSound(){}



//////////////////////////////////////////////////////
// ANIMATION LOOP
//////////////////////////////////////////////////////

// Request animation frame loop function
function animate() {

	//stats.begin();

	// Animate CreateJS
	if(!window.ANIMATION_OVER && window.musicInstance){
		var frame = Math.floor((window.musicInstance.getPosition()/1000)*30);
		root.gotoAndStop(frame);
	}
	sortSprites(scene.children);
    for(var i=0;i<sprites.length;i++){
    	sprites[i].draw();
    }

    // Sound pans
    for(var i=0;i<soundObjects.length;i++){
	    var sound = soundObjects[i];
	    sound.soundInstance.setPan(getSoundPan(sound.mc));
	}

	// Update VR headset position and apply to camera.
	controls.update();

	// Render the scene through the VREffect, but only if it's in VR mode.
	/*if(vrmgr.isVRMode()) {
		effect.render(scene, camera);
	} else {
		renderer.render(scene, camera);
	}*/
	effect.render(scene, camera);

	// End
	//stats.end();
	requestAnimationFrame(animate);

}


//////////////////////////////////////////////////////
// MISC STUFF I GUESS
//////////////////////////////////////////////////////

// Listen for keyboard event and zero positional sensor on appropriate keypress.
function onKey(event) {
    if (event.keyCode == 90) { // z
        controls.zeroSensor();
    }
};
window.addEventListener('keydown', onKey, true);

// Handle window resizes
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', onWindowResize, false);

/*
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
*/



//////////////////////////////////////////////////////
// HERE'S YOUR LOADER
//////////////////////////////////////////////////////

window.onload = function(){

	loader.loadManifest([
		{src:"animation/music/intro.mp3", id:"intro"}
	]);

};

