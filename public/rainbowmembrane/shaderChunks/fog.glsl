float fog( vec3 pos , float turnOn , float density  ){

  float dist = max( 0. , length( pos) - turnOn );
  float fogPow = 1. / pow( dist , density );

  return fogPow;

}

float fog( float near , float far ){

  float depth = gl_FragCoord.z / gl_FragCoord.w;

  float fogPow = smoothstep( near , far , depth );
  return fogPow;

}
