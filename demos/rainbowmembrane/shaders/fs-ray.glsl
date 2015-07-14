
uniform vec3 color;
uniform float time;
uniform sampler2D  t_audio;

varying float vID;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


$simplex

void main(){

  vec4 c = texture2D( t_audio , vec2( vID , 0. ) );
  float a = 1.;// snoise( gl_FragCoord.xy * .01 + vec2( time*.01 , time * .01 ) );
  gl_FragColor = c * c;// * vec4( .5 + vID * .5 ,abs(sin( vID * 10.)) , .1 , 1. ); 

}
