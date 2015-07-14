// container that fullscreen will be called on.
var container = document.getElementById('vrContainer');

// iframe which hosts remote content.
var iframe = document.getElementById('vrIframe');

// permission insturctions before requestFullscreen.
var permission = document.getElementById('vrPermissions');
var permissionContinue = document.getElementById('vrPermissionsContinue');

// permission instructions inside requestFullscreen.
var permissionFs = document.getElementById('vrPermissionsFs');

// shows after permission flow is finished.
var readyVr = document.getElementById('vrPermissionsReady');

// enterVR button
var enterVr = document.getElementById('enterVR');

// displays when VR is not detected
var getVr = document.getElementById('getVR');

var inPermissionFlow = false;

function show(el) {
  el.classList.remove('display-none');
};

function hide(el) {
  el.classList.add('display-none');
};

function sendPostmessage(data) {
  iframe.contentWindow.postMessage(data, '*');
};

// check if we have prompted for permissions.   display instructions if we haven't.
function permissions() {
  if (document.cookie.indexOf('fsPrompted=true') !== -1) {
    // we've prompted the user before for fullscreen permissions.  let's go!
    inPermissionFlow = false;
    hide(permission);
    hide(readyVr);
    sendPostmessage({ mode: 'vr' });
    requestFullscreen(container, { vrDisplay: vrDetect.hmdDevice });
  } else {
    hide(enterVr);
    show(permission);
  }
};

function permissionsFs() {
  hide(permission);
  show(vrPermissionsFs);
  requestFullscreen(container);
}

function exitPermissionFs() {
  hide(vrPermissionsFs);
  show(enterVr);
  sendPostmessage({ mode: 'mono' });
  if (inPermissionFlow) {
    show(readyVr);
    inPermissionFlow = false;
  }
}

function requestFullscreen(el, opts) {
  var options = opts || {};

  console.log(el, opts);

  // fullscreen
  if (el.requestFullscreen) {
    el.requestFullscreen(options);
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen(options);
    //sendPostmessage({ fullscreen: true });

    focusIframe();
  } else if (el.webkitRequestFullscreen) {
    /*
    Chromium does not allow us to call requestFullscreen with vrDisplay on
    anything except the webGL canvas element.  Because of this, the viewport
    distortion is not applied and user only gets stereo view.

    see issue: https://github.com/MozVR/MozVR.com-issues/issues/8


    As an alternative:

    Call fullscreen on canvas element from within the iframe.  The permission
    is then requested from the content URL.   The problem with this is
    that this permission handling happens within the HMD which makes it
    inaccessible for the user.
    */

    // sendPostmessage({ fullscreen: true });

    el.webkitRequestFullscreen(options);

    focusIframe();
  }

  // pointer lock
  var bodyEl = document.body;
  bodyEl.requestPointerLock = bodyEl.requestPointerLock || bodyEl.mozRequestPointerLock || bodyEl.webkitRequestPointerLock;
  bodyEl.requestPointerLock();


};

function handleFsChange(e) {
  var fullscreenElement = document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement;

  if (fullscreenElement == null) {
    // after exiting fullscreen.
    exitPermissionFs();
  }
};

function focusIframe() {
  iframe.contentWindow.focus();
};

enterVr.addEventListener('click', function() {
  permissions();
});

permissionContinue.addEventListener('click', function() {
  // set cookie
  document.cookie = "fsPrompted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  inPermissionFlow = true;
  permissionsFs();
})


document.addEventListener('mozfullscreenchange',handleFsChange);
document.addEventListener('webkitfullscreenchange',handleFsChange)

container.addEventListener('mouseover',focusIframe);

focusIframe();

vrDetect.enabled().then(function() {
  // vr detected
  hide(getVr)
}, function() {
  // vr not detected
  hide(enterVr);
  show(getVr);
});
