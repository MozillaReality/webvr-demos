
attribute float id;

varying float vID;
void main(){

  vID = id;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );

}
