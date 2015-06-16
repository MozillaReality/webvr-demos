create ={



  rainbowBox: function( size, segments , subdivisions ){

    var s = size || .1;
    var se = segments || 10;
    var sub = subdivisions || 3;
    var modifier = new THREE.SubdivisionModifier( sub );

    var matcap = THREE.ImageUtils.loadTexture('img/rough-aluminium.jpg');

    var uniforms = {

      t_matcap:{ type:"t" , value: matcap }

    }


    geometry = new THREE.BoxGeometry( s , s , s , se , se , se  );
    geometry.computeVertexNormals();

    geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    modifier.modify( geometry );
    
    material = new THREE.ShaderMaterial({

      uniforms:       uniforms,
      vertexShader:   shaders.vertexShaders.rainbow,
      fragmentShader: shaders.fragmentShaders.rainbow,

    });
   
    mesh = new THREE.Mesh( geometry, material );


    return mesh;


  }




}
