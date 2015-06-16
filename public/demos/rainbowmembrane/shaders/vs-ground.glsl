
varying vec3 vMVPos;
void main(){

  vMVPos = ( modelViewMatrix * vec4( position , 1. ) ).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );

}
