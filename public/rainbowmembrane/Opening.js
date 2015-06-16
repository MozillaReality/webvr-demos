function Opening( pArray ){


  this.positions = [];

  for( var i = 0; i < pArray.length; i++ ){

    var p = pArray[i];
    this.positions.push( new THREE.Vector3( p[0] , p[1] , p[2] ) );

  }


  var col = new THREE.Color();
  col.r = Math.random();
  col.g = Math.random();
  col.b = Math.random();



  var geo = rayMaker.createGeometry( light , this.positions, rayStoppers );
  
  this.body = new THREE.Mesh(  geo , new THREE.ShaderMaterial({

    uniforms:{
      color: { type:"c" , value: col },
      time:G.time,
      t_audio:G.t_audio,
    },
    attributes:{
      id:{
        type:"f",
        value:null
      }
    },
    vertexShader: shaders.vs.ray,
    fragmentShader: shaders.fs.ray,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
    
  }) );


  var geo = rayMaker.createCapGeometry( light , this.positions, rayStoppers );
  
  this.cap = new THREE.Mesh( geo , new THREE.MeshBasicMaterial({

    color:col, 
    side: THREE.DoubleSide,
    
  }) );

 // this.cap = c;


  mover.add( this.body );
  mover.add( this.cap );

}

Opening.prototype.reset = function(){

  var geo = rayMaker.createGeometry( light , this.positions, rayStoppers );

  this.body.geometry = geo;
  this.body.geometryNeedsUpdate = true;

  var cap = rayMaker.createCapGeometry( light , this.positions, rayStoppers );

  this.cap.geometry = cap;
  this.cap.geometryNeedsUpdate = true;

}
