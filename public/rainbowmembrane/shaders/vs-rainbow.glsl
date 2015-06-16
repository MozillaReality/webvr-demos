varying vec2 vSEM;
varying vec3 vEye;
varying vec3 vNorm;
varying float vFR;

$semLookup

void main(){

 
  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  
  
  vEye = normalize( mvPos.xyz );
  vNorm = normalize(normalMatrix * normal);

  vFR = dot( vEye , vNorm );
  
  vSEM = semLookup( vEye , vNorm );

  gl_Position = projectionMatrix * mvPos;

}


