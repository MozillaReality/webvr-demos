/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var WebVRManager = require('./webvr-manager.js');

window.WebVRManager = WebVRManager;

/*
* Debug parameters.
*/
// Enable distortion everywhere.
//WEBVR_FORCE_DISTORTION = true;
// Override the distortion background color.
//WEBVR_BACKGROUND_COLOR = new THREE.Vector4(1, 0, 0, 1);
// Change the tracking prediction mode.
//WEBVR_PREDICTION_MODE = 2;
// In prediction mode, change how far into the future to predict.
//WEBVR_PREDICTION_TIME_MS = 100;

//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);
// Create a three.js scene.
var scene = new THREE.Scene();
// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
camera.position.z = 2;
// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);
// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
// Create a VR manager helper to enter and exit VR mode.
var manager = new WebVRManager(renderer, effect, {hideButton: false});
// Also add a repeating grid as a skybox.
var boxWidth = 10;
var texture = THREE.ImageUtils.loadTexture(
  'img/box.png'
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(boxWidth, boxWidth);
var geometry = new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth);
var material = new THREE.MeshBasicMaterial({
  map: texture,
  color: 0x333333,
  side: THREE.BackSide
});
var skybox = new THREE.Mesh(geometry, material);
scene.add(skybox);

var video = document.querySelector('video');
var videoTexture = new THREE.VideoTexture(video);
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

var parameters = { color: 0xffffff, map: videoTexture };
var screenPlane = new THREE.BoxGeometry(640, 480, 1);
var screenMaterial = new THREE.MeshLambertMaterial(parameters);

var _screen = window._screen = new THREE.Mesh(screenPlane, screenMaterial);
_screen.position.z = -5;
// _screen.position.set(0, 20, -75);
_screen.rotation.set(0, 0, 0 );
_screen.scale.x = 0.0156;
_screen.scale.y = 0.0156;
_screen.scale.z = 0.0156;
scene.add(_screen);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0.5, 1, 1).normalize();
scene.add(light);

// Request animation frame loop function
function animate(timestamp) {
  // Update VR headset position and apply to camera.
  controls.update();
  // Render the scene through the manager.
  manager.render(scene, camera, timestamp);
  requestAnimationFrame(animate);
}
// Kick off animation loop
animate();
// Reset the position sensor when 'z' pressed.
function onKey(event) {
  if (event.keyCode == 90) { // z
    controls.resetSensor();
  }
};

window.addEventListener('keydown', onKey, true);
// Handle window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
