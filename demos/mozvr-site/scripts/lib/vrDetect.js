window.vrDetect = (function() {
    function vrDetect() {
      var self = this;

      this.enabled().then(function() {

      })
    };

    vrDetect.prototype.enabled = function() {
      var self = this;
      return new Promise(function(resolve, reject) {
        if (navigator.getVRDevices) {
          navigator.getVRDevices().then(function(devices) {

            console.log('found ' + devices.length + ' devices');

            for (var i = 0; i < devices.length; ++i) {
              if (devices[i] instanceof HMDVRDevice && !self.hmdDevice) {
                self.hmdDevice = devices[i];
                //console.log('found head mounted display device');
              }

              if (devices[i] instanceof PositionSensorVRDevice &&
                devices[i].hardwareUnitId == self.hmdDevice.hardwareUnitId &&
                !self.positionDevice) {
                self.positionDevice = devices[i];
                //console.log('found motion tracking devices');
                break;
              }
            }

            if (self.hmdDevice && self.positionDevice) {

              resolve();
              return;
            }

            reject('no VR devices found!');

          })
        } else {
          reject('no VR implementation found!');
        }
      });
    }
  return new vrDetect();
})();