vec3 ADSLightModel( vec3 norm , vec3 pos , vec3 cameraPos ){

  // seting up light vectors
  vec3 normv = normalize( norm );
  vec3 lightv = normalize( lightPosition - pos );
  vec3 viewv = normalize( cameraPos - pos );
  vec3 halfv = normalize( normalize( lightPosition ) + normalize( cameraPos )); 

  vec3 reflectionv = reflect( -lightv , norm );


  // Setting up colors
  vec3 ambientColor = ambientLightColor * ambientMaterialColor;
  vec3 diffuseColor = diffuseLightColor * diffuseMaterialColor;
  vec3 specularColor = specularLightColor * specularMaterialColor;
  
  // Manipulation 
  diffuseColor *= max( 0.0 , dot( lightv , norm ));

  specularColor *= pow( max( 0.0 , dot( normv , halfv ) ),shininess) ;


  return clamp( diffuseColor + ambientColor + specularColor , 0.0 , 1.0 );

}


