var camera;
var scene;
var renderer;
var mesh;

var effect;
var controls;
var clicky = 1;
var mouseX = 1;
var mouseY = 1;


// one quaternion per monkey
var polychoraList = ["8","24","24dual","24both","120"];
var polychoron = polychoraList[0];
var quatPerMonkeyArrayDict = { "8": centers_8_cell, "24": centers_24_cell, "24dual": centers_24_cell_dual, "24both": centers_24_cell_dual.concat(centers_24_cell), "120": centers_120_cell};

// var quatPerMonkeyArray = centers_24_cell_dual.concat(centers_24_cell);
var quatPerMonkeyArray = quatPerMonkeyArrayDict[polychoron];

var numMonkeys = quatPerMonkeyArray.length;
var matArray = new Array(numMonkeys);

var travelDirDict = {"8": centers_8_cell[5], "24": centers_24_cell_dual[4], "24dual": centers_24_cell_dual[4], "24both": centers_24_cell_dual[4], "120": centers_120_cell[3]};

var travelDir = travelDirDict[polychoron];  //for 24-cell_dual //4 is down head/foot.  //12 is (0,0,0,1)
var colourDir = travelDir;
var HopfColorMatrix = makeHopfColorMatrix(colourDir);

var modelScaleDict = {"8":1, "24":50, "24dual":50, "24both":50, "120":3.07768}
var modelScale = modelScaleDict[polychoron];

var modelFileNameDict = {"8":'media/monkey_15k_tris_closed.obj',
                        "24":'media/24-cell_monkey_lowpoly_001_cen-vert_50_flip.obj',
                        "24dual":'media/24-cell_monkey_lowpoly_001_cen-vert_50_flip.obj',
                        "24both":'media/24-cell_monkey_lowpoly_001_cen-vert_50_flip.obj',
                        "120":'media/120-cell_monkey_lowpoly_003_left_screw.obj'};
var modelFileName = modelFileNameDict[polychoron];

init();
animate();

function onkey(event) {
    event.preventDefault();
    if (event.keyCode == 90) { // z
        controls.zeroSensor();
    }
};
window.addEventListener("keydown", onkey, true);

document.body.addEventListener('dblclick', function () {
    effect.setFullScreen(true);
});

function loadStuff(){
    // one material per monkey, since they have a different quaternion
    for (var i = 0; i < numMonkeys; i++)
    {
        matArray[i] = materialBase.clone();
    }

    // load the monkey mesh
    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);
    loader.load(modelFileName, function (object) {
    // loader.load('media/dodecDualRot90.obj', function (object) {

        // make numMonkeys copies of the mesh and assign them a unique material out of the numMonkeys we created previously
        for (var i = 0; i < numMonkeys; i++)
        {
            var newObject = object.clone();
            newObject.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = matArray[i];
                    child.frustumCulled = false;
                }
            });
            scene.add(newObject);
        }
    });

    for (var i = 0; i < numMonkeys; i++)
    {
        matArray[i].uniforms['quatPerMonkey'].value = quatPerMonkeyArray[i];
        matArray[i].uniforms['time'].value = .00025 * (Date.now() - start);
        matArray[i].uniforms['mousePos'].value = new THREE.Vector2(mouseX, mouseY);
        matArray[i].uniforms['travelDir'].value = travelDir;
        matArray[i].uniforms['colourDir'].value = colourDir;
        matArray[i].uniforms['HopfColorMatrix'].value = HopfColorMatrix;
        matArray[i].uniforms['modelScale'].value = modelScale;
    }

}

function init()
{
    start = Date.now();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.x = 0;
    camera.position.z = 0;

    // -----
  // vr stuff
    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);

    controls = new THREE.VRControls(camera);

    effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);
    // -----

  // material for the monkeys is a shader
    materialBase = new THREE.ShaderMaterial({
    // these are the parameters for the shader
        uniforms: {
      // global time
            time: {
                type: "f",
                value: 0.0
            },
      // quaternion that moves this monkey into 4-space, set once per monkey
            quatPerMonkey: {
                type: "v4",
                value: new THREE.Vector4( 0, 0, 0, 0 )
            },
            mousePos: {
              type: "v2",
              value: new THREE.Vector2(0,0)
            },
            travelDir: {
                type: "v4",
                value: new THREE.Vector4( 0, 0, 0, 0 )
            },
            colourDir: {
                type: "v4",
                value: new THREE.Vector4( 0, 0, 0, 0 )
            },
                HopfColorMatrix: {
                type: "m4",
                value: new THREE.Matrix4().set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )
            },
            modelScale: {
                type: "f",
                value: 1.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });
    materialBase.side = THREE.FrontSide;

    loadStuff();

    window.addEventListener('resize', onWindowResize, false);

    effect.render(scene, camera);
    camera.position.x = .2;
    camera.position.z = .4;
    camera.position.y = .2;
}

function animate() {


  // send the time every frame so that we can rotate the monkeys over time
    for (var i = 0; i < numMonkeys; i++)
    {
        // matArray[i].uniforms['quatPerMonkey'].value = quatPerMonkeyArray[i];
        matArray[i].uniforms['time'].value = .00025 * (Date.now() - start);
        matArray[i].uniforms['mousePos'].value = new THREE.Vector2(mouseX, mouseY);
        // matArray[i].uniforms['travelDir'].value = travelDir;
        // matArray[i].uniforms['colourDir'].value = colourDir;
        // matArray[i].uniforms['HopfColorMatrix'].value = HopfColorMatrix;
        // matArray[i].uniforms['modelScale'].value = modelScale;
    }


    controls.update();

    gamepadUpdate();

    effect.render(scene, camera);

    requestAnimationFrame(animate);
}

var aPressed = false;
var bPressed = false;
var xPressed = false;
var yPressed = false;
function gamepadUpdate() {
    for (j in controls.controllers) {
      var controller = controls.controllers[j];

      if (controller.buttons[0].pressed && !aPressed) {
        changePolychoron(1);
      } else if (controller.buttons[1].pressed && !bPressed) {
        changePolychoron(2);
      } else if (controller.buttons[2].pressed && !xPressed) {
        changePolychoron(4);
      } else if (controller.buttons[3].pressed && !yPressed) {
        changePolychoron(5);
      }

      aPressed = controller.buttons[0].pressed;
      bPressed = controller.buttons[1].pressed;
      cPressed = controller.buttons[2].pressed;
      dPressed = controller.buttons[3].pressed;
    }
}

document.addEventListener('keydown', function(event) { selectPolychora(event); }, false);

function selectPolychora(event) {

  var keySelect = event.keyCode - 48; //1 is 49

  if (keySelect > 0 && keySelect < 6){
    changePolychoron(keySelect);
  }
}

function changePolychoron(selected) {
    if (scene) {
      while (scene.children.length > 0) {
          scene.remove(scene.children[scene.children.length - 1]);
      }
   polychoron = polychoraList[(selected-1)];
   quatPerMonkeyArray = quatPerMonkeyArrayDict[polychoron];
   numMonkeys = quatPerMonkeyArray.length;
   matArray = new Array(numMonkeys);
   travelDir = travelDirDict[polychoron];  //for 24-cell_dual //4 is down head/foot.  //12 is (0,0,0,1)
   colourDir = travelDir;
   HopfColorMatrix = makeHopfColorMatrix(colourDir);
   modelScale = modelScaleDict[polychoron];
   modelFileName = modelFileNameDict[polychoron];

   loadStuff();
   }
}

    //listen for mouse movement to get mouseX and mouseY

    document.body.addEventListener( 'mousemove', function (event) {
       mouseY = event.clientY;
       mouseX = event.clientX;
    });

    //listen for click

    document.body.addEventListener( 'click', function(){
      clicky = (clicky + 1) % 5 + 1;
      changePolychoron(clicky);
      effect.setFullScreen( true );
    })

    /*
    Listen for keyboard events
    */
    function onkey(event) {
      event.preventDefault();

      if (event.keyCode == 90) { // z
        controls.zeroSensor(); //zero rotation
      } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
        effect.setFullScreen(true) //fullscreen
      }else if (event.keyCode === 73){ //i
        infoSign.material.visible = !infoSign.material.visible;
      }else if (event.keyCode == 80) {//p
        var music = document.querySelector('#music');
        if (music.paused){
          music.play();
        } else{
          music.pause();
        }
      }


    };
    window.addEventListener("keydown", onkey, true);

        //hold down keys to do rotations and stuff
    // function key(event, sign) {
    //   var control = controls.manualControls[String.fromCharCode(event.keyCode).toLowerCase()];
    //   if (!control)
    //     return;
    //   if (sign === 1 && control.active || sign === -1 && !control.active)
    //     return;
    //   control.active = (sign === 1);
    //   controls.manualRotateRate[control.index] += sign * control.sign;
    // }
    document.addEventListener('keydown', function(event) { key(event, 1); }, false);
    document.addEventListener('keyup', function(event) { key(event, -1); }, false);

    /*
    Handle window resizes
    */
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      effect.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener( 'resize', onWindowResize, false );
