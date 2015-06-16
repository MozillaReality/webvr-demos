
uniform vec3 fogColor;
varying vec3 vMVPos;

$fog

void main(){


  vec4 col    = vec4( 1. , 0. , 0. , 1. );
  float fogPower = fog( .1 , 10.);  
 
  gl_FragColor = col;
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogPower );

}

