var camera;
var scene;
var renderer;
var mesh;
var bigMatArray = new Array(1728); //12 times 144, one for each gift
var infoSprite = new THREE.Mesh();
var effect;
var controls;
var music = document.querySelector('#music');
var clicky = 0;
var mouseX = 1;
var mouseY = 1;
var currentBoost = new THREE.Matrix4().set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);

var fixOutside = false; //moves you back inside the central cell if you leave it

var tsfms = new Array(144);
for (j = 0; j < 144; j++){
  tsfms[j] = new THREE.Matrix4().copy(tilingGens[((j/12)|0) + 1]).multiply(tilingGens[(j%12) + 1]);
}

var phraseOrder = [0,2,1,  // phrases in the song are ordered like this
  13,3,2,1,
  14,4,3,2,1,
  15,5,4,3,2,1,
  16,6,5,4,3,2,1,
  17,7,6,5,4,3,2,1,
  18,8,7,6,5,4,3,2,1,
  19,9,8,7,6,5,4,3,2,1,
  20,10,9,8,7,6,5,4,3,2,1,
  21,11,10,9,8,7,6,5,4,3,2,1,
  22,12,11,10,9,8,7,6,5,4,3,2,23]; // #last one goes forever
var phraseTimes = [25, 28, 36, 45, 48, 51, 59, 68, 71, 74, 77, 85, 94, 102, 105, 108, 111, 119, 128, 131, 139, 142, 145, 148, 156, 165, 168, 171, 179, 182, 185, 188, 196, 205, 208, 211, 214, 222, 225, 228, 231, 239, 248, 251, 254, 257, 260, 268, 271, 274, 277, 285, 294, 297, 300, 303, 306, 309, 317, 320, 323, 326, 334, 343, 346, 349, 352, 355, 358, 361, 369, 372, 375, 378, 386, 395, 398, 401, 404, 407, 410, 413, 416, 424, 427, 430, 433];

var phraseOnOffMaps = [
  [true, false, false, false, false, false, false, false, false, false, false, false ], //phrase 0
  [true, false, false, false, false, false, false, false, false, false, false, false ],
  [false, true, false, false, false, false, false, false, false, false, false, false ],
  [false, false, true, false, false, false, false, false, false, false, false, false ],
  [false, false, false, true, false, false, false, false, false, false, false, false ],
  [false, false, false, false, true, false, false, false, false, false, false, false ],
  [false, false, false, false, false, true, false, false, false, false, false, false ],
  [false, false, false, false, false, false, true, false, false, false, false, false ],
  [false, false, false, false, false, false, false, true, false, false, false, false ],
  [false, false, false, false, false, false, false, false, true, false, false, false ],
  [false, false, false, false, false, false, false, false, false, true, false, false ],
  [false, false, false, false, false, false, false, false, false, false, true, false ],
  [false, false, false, false, false, false, false, false, false, false, false, true ],
  [true, true, false, false, false, false, false, false, false, false, false, false ],
  [true, true, true, false, false, false, false, false, false, false, false, false ],
  [true, true, true, true, false, false, false, false, false, false, false, false ],
  [true, true, true, true, true, false, false, false, false, false, false, false ],
  [true, true, true, true, true, true, false, false, false, false, false, false ],
  [true, true, true, true, true, true, true, false, false, false, false, false ],
  [true, true, true, true, true, true, true, true, false, false, false, false ],
  [true, true, true, true, true, true, true, true, true, false, false, false ],
  [true, true, true, true, true, true, true, true, true, true, false, false ],
  [true, true, true, true, true, true, true, true, true, true, true, false ],
  [true, true, true, true, true, true, true, true, true, true, true, true ]  //phrase 23
];

function init() {
  start = Date.now();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.x = 0;
  camera.position.z = 0;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);

  controls = new THREE.VRControls(camera);

  effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);

  materialBase = new THREE.ShaderMaterial({
    uniforms: { // these are the parameters for the shader
      time: { // global time
        type: "f",
        value: 0.0
      },
      translation: { // quaternion that moves shifts the object, set once per object
        type: "m4",
        value: new THREE.Matrix4().set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
      },
      boost: {
        type: "m4",
        value: new THREE.Matrix4().set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
      }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  
  materialBase.side = THREE.DoubleSide;

  // one material per object, since they have a different positions
  for (var i = 0; i < 1728; i++) {
    bigMatArray[i] = materialBase.clone();
  }

  var manager = new THREE.LoadingManager();
  var loader = new THREE.OBJLoader(manager);

  loader.load('media/12_days_of_xmas_dodec_1.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_2.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 1*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_3.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 2*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_4.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 3*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_5.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 4*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_6.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 5*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_7.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 6*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_8.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 7*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_9.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 8*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_10.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 9*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_11.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 10*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  loader.load('media/12_days_of_xmas_dodec_12.obj', function (object) {
    for (var i = 0; i < 144; i++) {
      var newObject = object.clone();
      newObject.children[0].material = bigMatArray[(i + 11*144)];
      newObject.children[0].frustumCulled = false;
      scene.add(newObject);
    }
  });

  //create info overlay
  var infoText = THREE.ImageUtils.loadTexture( "media/twelve-ui.png" ); 
  var infoMaterial = new THREE.MeshBasicMaterial( {map: infoText, wireframe: false, color: 0x777777 }); 
  var infoBox = new THREE.BoxGeometry(2,1,1);
  infoSprite = new THREE.Mesh( infoBox, infoMaterial );
  infoSprite.position.z = -2;
  infoSprite.position.x = -.5;
  infoSprite.position.y = -1;
  infoSprite.rotation.x = -.3;
  scene.add( infoSprite );

  effect.render(scene, camera);
}


function animate() {

  var currentPhrase = phraseOrder[0];  //update in the following for loop
  for (var n = phraseTimes.length - 1; n >= 0; n--) {
    if ((music.currentTime*140/60) > phraseTimes[n]) {
      currentPhrase = phraseOrder[n+1];
      break;
    }
  }

  if (music.currentTime > 20){
  infoSprite.visible = false;
  }

  for (var i = 0; i < 1728; i++) {
    var j = i%144;
    var k = (i/144)|0;
    bigMatArray[i].uniforms['translation'].value = tsfms[j];
    bigMatArray[i].uniforms['boost'].value = currentBoost;

    bigMatArray[i].visible = phraseOnOffMaps[currentPhrase][k];
  }

  controls.update();
  effect.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
animate();

//Listen for double click event to enter full-screen VR mode
document.body.addEventListener( 'click', function() {
  effect.setFullScreen( true );
});
