// TODO: Best way to update 

function PositionalAudio( controller ,  file , params ){

    this.loader;
    this.controller = controller;
    
    this.params = _.defaults( params || {}, {
        
      looping:      false,
      fbc:            128,
      fadeTime:         1,
      texture:       true,
      output:       this.controller.gain

    });

    this.file       = file;

    this.playing    = false;

    this.looping    = this.params.looping;
    this.output     = this.params.output;
    
    this.buffer;

    this.filterOn       = false;
    this.filter         = this.controller.ctx.createBiquadFilter();
    this.analyser       = this.controller.ctx.createAnalyser();
    this.analyser.array = new Uint8Array( this.params.fbc );
    this.gain           = this.controller.ctx.createGain();

    this.panner         = this.controller.ctx.createPanner();

    this.updateAnalyser       = false;
    this.updateAverageVolume  = false;
    this.updateTexture        = false;

    this.analyzer = this.analyser; // I hate spelling 

    this.gain.connect( this.analyser );
    this.analyser.connect( this.panner  );
    this.panner.connect( this.output );

    this.time = 0;

    if( this.params.texture ){

      this.audioTexture  = new AudioTexture( this );
      this.texture = this.audioTexture.texture;

      this.controller.addToUpdateArray( this.update.bind( this )  );
    
    }

    this.loadFile();

  }

  PositionalAudio.prototype.reconnect = function( newOutput ){
   
    this.analyser.disconnect( this.output );
    this.output = newOutput;
    this.analyser.connect( this.output );
  
  }

  PositionalAudio.prototype._loadProgress = function(e){

    this.loaded =  e.loaded / e.total;
    
    this.loadProgress( e );

  //tween.start();
  }

  PositionalAudio.prototype.loadProgress = function(){}


  PositionalAudio.prototype.loadFile = function(){
  

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

  PositionalAudio.prototype.onDecode = function(){

    //gets just the track name, removing the mp3
    this.trackID= this.file.split('.')[this.file.split('.').length-2];

    this.createSource();

    //var self = this;
    //if( this.params.onLoad ) this.params.onLoad( self );

    this._onLoad();

  }

  PositionalAudio.prototype.createSource = function() {

    this.source         = this.controller.ctx.createBufferSource();
    this.source.buffer  = this.buffer;
    this.source.loop    = false;//this.looping;
          
    this.source.connect( this.gain );

    /*if( !this.looping ){
      
      this.gain.gain.value = 1;

    }*/

    //this.gain.connect( this.analyser );

  };

  PositionalAudio.prototype.destroySource = function(){
     
    console.log( 'DESTROY' );
    this.source.disconnect(this.analyser);
    this.analyser.disconnect(this.gain);
    this.source = undefined;
    this.analyser = undefined;

  };

  PositionalAudio.prototype.fadeOut = function( time ){
 
    var t = this.controller.ctx.currentTime;
    if( !time ) time = this.params.fadeTime;
    this.gain.gain.linearRampToValueAtTime( this.gain.gain.value , t );
    this.gain.gain.linearRampToValueAtTime( 0.0 , t + time );

  }
  
  PositionalAudio.prototype.fadeIn = function( time , value ){
  
    if( !time  ) time  = this.params.fadeTime;
    if( !value ) value = 1;

    var t = this.controller.ctx.currentTime;
    this.gain.gain.linearRampToValueAtTime( this.gain.gain.value , t );
    this.gain.gain.linearRampToValueAtTime( 1.0 , t + time );

  }

  PositionalAudio.prototype.turnOffFilter = function(){
    this.filterOn = false;
    this.filter.disconnect(0);
    this.source.disconnect( 0 );
    this.source.connect( this.gain );
  }

  PositionalAudio.prototype.turnOnFilter = function(){
    this.filterOn = true;
    this.source.disconnect( 0 );
    this.source.connect( this.filter );
    this.filter.connect( this.gain );
  }



  PositionalAudio.prototype.stop = function(){

    this.playing = false;

    this.source.stop();

    this.createSource();

  };
		
  PositionalAudio.prototype.play = function(){
	
    //this.startTime = this.controller.womb.time.value;

    this.playing = true;

   
    console.log( 'HELLOS');
    this.source.start();
   
    // Creates a new source for the audio right away
    // so we can play the next one with no delay
  //  if(this.source.loop == false){
      this.createSource();	
  //  }
   //
   //this.controller.addToUpdateArray( this.update.bind( this ) );

  };

  PositionalAudio.prototype._onLoad = function(){

    if( this.looping ){
    
      console.log( 'LOADSS');
      
      looper.everyLoop( function(){

        console.log( this );
        console.log( 'UPSPSP');
        console.log(this.playing );
        if( this.playing ){
          this.play()
        }
      
      }.bind( this ));

     // this.gain.gain.value = 0;

    }

    this.onLoad();

    //this.controller.addToUpdateArray( this.update.bind( this ) );
    
  }
  PositionalAudio.prototype.onLoad = function(){}


  PositionalAudio.prototype.update = function(){

    if( this.playing ){
     
      //this.time = this.controller.womb.time.value - this.startTime;
     
      if( this.position ){

        var p = this.position;
        this.panner.setPosition( p.x , p.y , p.z );

      }


      if( this.updateAnalyser ) this.analyser.getByteFrequencyData( this.analyser.array );
      
      if( this.updateAverageVolume ) this.averageVolume = this.getAverage( this.analyser.array );


      if( this.audioTexture ){
        if( this.updateTexture ){
          this.audioTexture.update();
        }
      }
      //console.log( this.averageVolume );
      //if( this.texture )
      //  this.texture.update();

    }
  
  }

  PositionalAudio.prototype.getAverage = function( array ){

    var ave = 0;
    var l = array.length;

    for( var i = 0; i< array.length; i++ ){

      ave += array[i];

    }

    ave /= l;

    return ave;

  }



