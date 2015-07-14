varying vec3 vNorm;
varying vec3 vPos;

void main(){

  vNorm = normalMatrix * normal;
  vPos  = position;

  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPos;

}


