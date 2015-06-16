
var TONE_GEO = new THREE.IcosahedronGeometry( .02 , 1 );
var TONE_MAT = new THREE.MeshBasicMaterial({color:0xffffff});
function Tone( audioController ,  freq , baseVal , position ){

  var ctx = audioController.ctx;

  this.base       = ctx.createOscillator();
  this.baseGain   = ctx.createGain();
  this.gain       = ctx.createGain();
  this.panner     = ctx.createPanner();

  this.base.frequency.value = freq;
  this.base.start( 0 );

  this.baseGain.gain.value = baseVal;

  this.base.connect( this.baseGain );
  this.baseGain.connect( this.gain );
  this.gain.connect( this.panner );
  this.panner.connect( audioController.gain );

  //this.gain.connect( audioController.gain );
  this.position = position;

  var p = position;
  this.panner.setPosition( p.x , p.y , p.z );

  this.mesh = new THREE.Mesh( TONE_GEO , TONE_MAT );
  this.mesh.position.copy( p );

  //scene.add( this.mesh );
 
  audioController.addToUpdateArray( this.update.bind( this )  );


}

Tone.prototype.update = function(){

  if( this.position ){

    var p = this.position;
  //  this.panner.setPosition( p.x , p.y , p.z );
  //
    tv1.copy( this.position );
    tv1.sub( soundPos );
    this.gain.gain.value = Math.min( 1 ,  1 - Math.pow(tv1.length(), .01 ) );

  }

}

