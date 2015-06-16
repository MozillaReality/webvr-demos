uniform float time;

varying vec3 vNorm;
varying vec3 vPos;
varying float vDisplacement;

$simplex

void main(){

  vec3 pos = position;
  vec3 offset = vec3( time * 10. , time * 10. , time * 30. );
  float displacement = snoise( (position + offset) * .01 );

  vPos = position * ( 1. + .3 * displacement );
  vNorm = normal;
  vDisplacement = displacement;

  vec4 mvPos = modelViewMatrix * vec4( vPos , 1.0 );
  gl_Position = projectionMatrix * mvPos;

}
