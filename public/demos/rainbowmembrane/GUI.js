

function GUI( PARAMS ,  params ){

  this.params = _.defaults( params || {} ,{
    domElement: document.body,
  });


  console.log( this.params );
  this.PARAMS = PARAMS;

  this.gui = new dat.GUI({autoPlace:false});
  this.gui.close();

  // TODO: make passable
  this.domElement = this.params.domElement;
  this.domElement.appendChild(this.gui.domElement);

  this.gui.add( PARAMS , 'rotationSpeed' , 0 , 1 );
  this.gui.add( PARAMS , 'rotationRadius' , 10 , 300 );


  this.soul = this.gui.addFolder( 'Soul' );
  this.body = this.gui.addFolder( 'Body' );

  for( var propt in PARAMS.soul ){
     
    var p = PARAMS.soul[propt];

    if( p.type === "f" ){

      if(p.constraints ){
        this.addFloat( 'soul' , p , propt , p.constraints );
      }else{
        this.addFloat( 'soul' , p , propt );
      }
    
    }
  }




   for( var propt in PARAMS.body ){
     
    var p = PARAMS.body[propt];

    if( p.type === "f" ){

      if(p.constraints ){
        this.addFloat( 'body' , p , propt , p.constraints );
      }else{
        this.addFloat( 'body' , p , propt );
      }
    
    }else if(  p.type === "color" ){

      this.addColor( 'body' , p ,  propt );

    }

  }

}

// Need to create an extra varible call tmp_color1  to be able to use
GUI.prototype.addColor = function( folder , object , name ){

  console.log('ass');
  var actualObject = name.split( 'tmp_' )[1];
  console.log( actualObject );

  console.log( object );
  this[folder].addColor( object , 'value' ).name( actualObject ).onChange(function(v){
    this.PARAMS[folder][actualObject].value.setHex( v )

  }.bind( this ) );


}

GUI.prototype.addFloat = function( folder , object , name , constraints ){

  if( constraints ){
    this[folder].add( object , 'value' , constraints[0] , constraints[1] ).name( name ); 
  }else{
    this[folder].add( object , 'value' ).name( name ); 
  }

}

/*

  guiSim.add( PARAMS.simulation.repulsionPower , 'value' , -10 , 100).name( 'Repulsion Power' );
  guiSim.add( PARAMS.simulation.repulsionRadius , 'value' , 10 , 1000).name( 'Repulsion Radius' );
  guiSim.add( PARAMS.simulation.dampening , 'value' , .8 , .999 ).name( 'Dampenening' );

  guiSim.add( PARAMS , 'toggle').name( 'toggleRepelers' );



  guiSim.add( PARAMS, 'objectType' , [
    'cube',
    'sphere' , 
    //'hand' , 
    //'skull' , 
    //'logo' ,
    //'bieb' ,
    //'rickAndBarney', 
    //'ring', 
    'torus' 
  ] ).onChange( function(value){

    recreateGeometry(value);
    console.log(value);

  });


  guiRender.add( PARAMS.render.audioDisplacement , 'value' , -3 , 3).name( 'Audio Displacement' );
  guiRender.add( PARAMS.render.custom1 , 'value' , 0 , 1).name( 'Custom1' );
  guiRender.add( PARAMS.render.custom2 , 'value' , 0 , 1).name( 'Custom2' );
  guiRender.add( PARAMS.render.custom3 , 'value' , 0 , 1).name( 'Custom3' );
  
  guiRender.addColor( PARAMS.render , 'lambTemp' ).name( 'Lambert' ).onChange( function( value ){

    PARAMS.render.c_lamb.value.r =value.r / 256;
    PARAMS.render.c_lamb.value.g =value.g / 256;
    PARAMS.render.c_lamb.value.b =value.b / 256;
    
  }).listen();

  guiRender.addColor( PARAMS.render , 'specTemp' ).name( 'Specular' ).onChange( function( value ){

    PARAMS.render.c_spec.value.r =value.r / 256;
    PARAMS.render.c_spec.value.g =value.g / 256;
    PARAMS.render.c_spec.value.b =value.b / 256;
    
  }).listen();

   guiRender.addColor( PARAMS.render , 'audioTemp' ).name( 'Fresnel?' ).onChange( function( value ){

    PARAMS.render.c_audio.value.r =value.r / 256;
    PARAMS.render.c_audio.value.g =value.g / 256;
    PARAMS.render.c_audio.value.b =value.b / 256;
    
  }).listen();


  PARAMS.render.lambTemp.r = PARAMS.render.c_lamb.value.r * 256;
  PARAMS.render.lambTemp.g = PARAMS.render.c_lamb.value.g * 256;
  PARAMS.render.lambTemp.b = PARAMS.render.c_lamb.value.b * 256;

  PARAMS.render.specTemp.r = PARAMS.render.c_spec.value.r * 256;
  PARAMS.render.specTemp.g = PARAMS.render.c_spec.value.g * 256;
  PARAMS.render.specTemp.b = PARAMS.render.c_spec.value.b * 256;

  PARAMS.render.audioTemp.r = PARAMS.render.c_audio.value.r * 256;
  PARAMS.render.audioTemp.g = PARAMS.render.c_audio.value.g * 256;
  PARAMS.render.audioTemp.b = PARAMS.render.c_audio.value.b * 256;




  guiRender.add( PARAMS,'visualType' , [  
    'plastic' , 
    'wireframe' , 
    'striped' , 
    'ambient',
    'fractal'
  ]).onChange(function(value){

*/
