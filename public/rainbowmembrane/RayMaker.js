function RayMaker( light , opening , ground ){


  this.v1 = new THREE.Vector3();

  this.markers = [];

  var g = new THREE.IcosahedronGeometry( .02 , 1 );
  var m = new THREE.MeshNormalMaterial();

  for( var i = 0; i < 2000; i++ ){
  
    var mesh =  new THREE.Mesh( g , m );
    this.markers.push( mesh );

    mover.add( mesh );
    mesh.position.x = 100000;

    //mesh.visible = false;
  }

  // opening is array of points

  // ground is the mover we are going to intersect with, to 
  // know where the ray needs to end



}

RayMaker.prototype.cast = function( light , point , ground ){

  this.v1.copy( point );
  this.v1.sub( light );
  this.v1.normalize();
  raycaster.set( point , this.v1 );

  var o = raycaster.intersectObjects( ground , true );

  if( !o[0] ){

    console.log( 'NO INTERSECTIONS' );

  }else{

    return o[0];

  }

}

RayMaker.prototype.createGeometry = function( light , opening , ground ){

  var v1 = new THREE.Vector3();
  var numOf = opening.length;

  //console.log( light );

  var iPoints = [];
  var iDist   = [];


  var ave = new THREE.Vector3();
  for( var i = 0; i < numOf; i++ ){
    ave.add( opening[i] );
  }

  ave.multiplyScalar( 1 / numOf );



  // Finds the base points of our projections onto the object
  for( var i = 0; i < numOf; i++ ){

    var p = opening[i];
    var o = this.cast( light , p , ground );
  
    if( !o ){

      console.log( this );
      alert( 'NO INTERSECTION FOUND' );

    }else{
      
      iPoints.push( o.point.clone().sub( mover.position ) );
      iDist.push( o.distance );

      this.markers[i].position.copy( o.point.clone().sub( mover.position ) );

    }

  }

  var geometry = new THREE.BufferGeometry();

  // 6 from side 3 from top
  var verts = numOf * 6;  
  
  var positions = new Float32Array( verts * 3 );
  var normals   = new Float32Array( verts * 3 );
  var distances = new Float32Array( verts * 1 );
  var ids       = new Float32Array( verts * 1 );


  for( var i = 0; i < numOf; i++ ){

    var next = (i+1)%numOf;

    /*
      
     1 - 2
     | / |
     |/  |
     3 - 4

    */
    var v1 = opening[ i ];
    var v2 = opening[ next ];
    var v3 = iPoints[ i ];
    var v4 = iPoints[ next ];

    var d1 = iDist[ i ];
    var d2 = iDist[ next ];

    var index = i * 6; 

    positions[ index * 3 + 0  ] = v1.x;
    positions[ index * 3 + 1  ] = v1.y;
    positions[ index * 3 + 2  ] = v1.z;

    positions[ index * 3 + 3  ] = v2.x;
    positions[ index * 3 + 4  ] = v2.y;
    positions[ index * 3 + 5  ] = v2.z;

    positions[ index * 3 + 6  ] = v3.x;
    positions[ index * 3 + 7  ] = v3.y;
    positions[ index * 3 + 8  ] = v3.z;

    positions[ index * 3 + 9  ] = v2.x;
    positions[ index * 3 + 10 ] = v2.y;
    positions[ index * 3 + 11 ] = v2.z;

    positions[ index * 3 + 12 ] = v4.x;
    positions[ index * 3 + 13 ] = v4.y;
    positions[ index * 3 + 14 ] = v4.z;

    positions[ index * 3 + 15 ] = v3.x;
    positions[ index * 3 + 16 ] = v3.y;
    positions[ index * 3 + 17 ] = v3.z;

 


    distances[ index + 0 ] = 0;
    distances[ index + 1 ] = 0;
    distances[ index + 2 ] = d1;
    
    distances[ index + 3 ] = 0;
    distances[ index + 4 ] = d2;
    distances[ index + 5 ] = d1;


    ids[ index + 0 ] = i/numOf;
    ids[ index + 1 ] = next/numOf;
    ids[ index + 2 ] = i/numOf;
    
    ids[ index + 3 ] = next/numOf;
    ids[ index + 4 ] = next/numOf;
    ids[ index + 5 ] = i/numOf;

    




  }

 



  //console.log( positions );
  //console.log( normals );
  //console.log( distances );

  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  //geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
  geometry.addAttribute( 'distance', new THREE.BufferAttribute( distances , 1 ) );
  geometry.addAttribute( 'id', new THREE.BufferAttribute( ids , 1 ) );
  

  return geometry;

}

RayMaker.prototype.createCapGeometry = function( light , opening , ground ){

  var v1 = new THREE.Vector3();
  var numOf = opening.length;

  //console.log( light );

  var iPoints = [];
  var iDist   = [];


  var ave = new THREE.Vector3();
  for( var i = 0; i < numOf; i++ ){
    ave.add( opening[i] );
  }

  ave.multiplyScalar( 1 / numOf );

  
  var geometry = new THREE.BufferGeometry();

  // 6 from side 3 from top
  var verts = numOf * 6;  
  
  var positions = new Float32Array( verts * 3 );
 
  for( var i = 0; i < numOf; i++ ){

    var next = (i+1)%numOf;

    var v1 = opening[ i ];
    var v2 = opening[ next ];
    var v3 = ave;

    index = i * 3;

    positions[ index * 3 + 0  ] = v1.x;
    positions[ index * 3 + 1  ] = v1.y;
    positions[ index * 3 + 2  ] = v1.z;

    positions[ index * 3 + 3  ] = v2.x;
    positions[ index * 3 + 4  ] = v2.y;
    positions[ index * 3 + 5  ] = v2.z;

    positions[ index * 3 + 6  ] = v3.x;
    positions[ index * 3 + 7  ] = v3.y;
    positions[ index * 3 + 8  ] = v3.z;




  }

  //console.log( positions );

  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  

  return geometry;

}
