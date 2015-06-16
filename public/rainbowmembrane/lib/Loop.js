var TONE_GEO = new THREE.IcosahedronGeometry( .002 , 1 );
var TONE_MAT = new THREE.MeshBasicMaterial({color:0xffffff});
function Loop( audioController ,  file , baseVal , position ){

  var ctx = audioController.ctx;

  //this.base       = ctx.createOscillator();
  this.baseGain   = ctx.createGain();
  this.gain       = ctx.createGain();
  //this.panner     = ctx.createPanner();

 // this.base.frequency.value = freq;
  //this.base.start( 0 );

  this.baseGain.gain.value = baseVal;

  //this.base.connect( this.baseGain );
  this.baseGain.connect( this.gain );
  this.gain.connect( audioController.gain );
  //this.panner.connect( audioController.gain );


  this.buffer;
  this.playing;
  this.looping = true;
  this.controller = audioController;


  this.file = file;

  //this.gain.connect( audioController.gain );
  this.position = position;

  var p = position;
 // this.panner.setPosition( p.x , p.y , p.z );

  this.mesh = new THREE.Mesh( TONE_GEO , TONE_MAT );
  this.mesh.position.copy( p );

 // scene.add( this.mesh );

  this.loadFile();
  
  audioController.addToUpdateArray( this.update.bind( this )  );


}

Loop.prototype.update = function(){

  if( this.playing ){
    
    if( this.position ){

      var p = this.position;
    //  this.panner.setPosition( p.x , p.y , p.z );
    //
      tv1.copy( this.position );
      tv1.sub( soundPos );
      tv2.copy( this.position );
      tv2.sub( soundPos1 );

      this.gain.gain.value = Math.min( 2 , 10000 / Math.pow(( tv1.length() * 10. ) , 10)  );
      this.gain.gain.value += Math.min( 2 , 10000 / Math.pow(( tv2.length() * 10. ) , 10)  );

      //console.log( this.gain.gain.value );

    }

  }
}

  Loop.prototype.stop = function(){
    this.playing = false;
  };
		
  Loop.prototype.play = function(){
    this.playing = true;
     console.log( 'HELLOS');
    this.source.start();
 
    // Creates a new source for the audio right away
    // so we can play the next one with no delay
  //  if(this.source.loop == false){
      this.createSource();	
  }


  Loop.prototype._loadProgress = function(e){

    this.loaded =  e.loaded / e.total;
    
    this.loadProgress( e );

  //tween.start();
  }

  Loop.prototype.loadProgress = function(){}
  Loop.prototype.loadFile = function(){
  

    var request=new XMLHttpRequest();
	request.open("GET",this.file,true);
	request.responseType="arraybuffer";
   
    var self = this;
    request.onerror = function(){
      alert( 'ERROR LOADING SONG' );
      //self.womb.loader.addFailue( 'Capability to load song' , 'http://womble.com'
    }

  

    request.onprogress = this._loadProgress.bind( this );
    
    var self = this;
    
    request.onload = function(){

      self.controller.ctx.decodeAudioData(request.response,function(buffer){

        if(!buffer){
          alert('error decoding file data: '+url);
          return;
        }

        self.buffer = buffer;
        self.onDecode();

      })
    },

    request.send();

  }
Loop.prototype.onDecode = function(){

    //gets just the track name, removing the mp3
    this.trackID= this.file.split('.')[this.file.split('.').length-2];

    this.createSource();

    //var self = this;
    //if( this.params.onLoad ) this.params.onLoad( self );

    this._onLoad();

  }
 Loop.prototype.createSource = function() {

    this.source         = this.controller.ctx.createBufferSource();
    this.source.buffer  = this.buffer;
    this.source.loop    = false;//this.looping;
          
    this.source.connect( this.baseGain );

    /*if( !this.looping ){
      
      this.gain.gain.value = 1;

    }*/

    //this.gain.connect( this.analyser );

  };


 Loop.prototype._onLoad = function(){

    if( this.looping ){
    
      looper.everyLoop( function(){


        if( this.playing ){
          this.play()
        }
      
      }.bind( this ));

     // this.gain.gain.value = 0;

    }

    this.onLoad();

    //this.controller.addToUpdateArray( this.update.bind( this ) );
    
  }

  Loop.prototype.onLoad = function(){
    onLoad();
  }




