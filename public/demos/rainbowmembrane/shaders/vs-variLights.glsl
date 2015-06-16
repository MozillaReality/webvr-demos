
varying vec2 vSEM;
varying vec4 vMPos;
varying vec3 vNorm;
varying vec3 vEye;
varying vec3 vCam;

varying mat3 vNormMat;

$semLookup

void main(){

   
  vMPos = modelMatrix * vec4( position, 1.0 );
  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  
  vEye = normalize( mvPos.xyz );
  vNorm = normalize( (modelMatrix * vec4( normal, 0. )).xyz);

  vNormMat =  normalMatrix;
  
  vCam = cameraPosition;

  vSEM = semLookup( vEye , normalMatrix * normal );

  gl_Position = projectionMatrix * mvPos;
  

}
