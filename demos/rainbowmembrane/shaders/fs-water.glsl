varying vec3 vView;
varying vec3 vNormal;
varying vec2 vUv;

varying mat3 vNormalMat;
varying vec3 vLightDir;
varying float vDisplacement;


vec3 cubicCurve( float t , vec3  c0 , vec3 c1 , vec3 c2 , vec3 c3 ){

  float s  = 1. - t; 

  vec3 v1 = c0 * ( s * s * s );
  vec3 v2 = 3. * c1 * ( s * s ) * t;
  vec3 v3 = 3. * c2 * s * ( t * t );
  vec3 v4 = c3 * ( t * t * t );

  vec3 value = v1 + v2 + v3 + v4;

  return value;

}


vec3 interpolate( float amount , vec3 c0 , vec3 c0 , vec3 c0 , vec3 c0 ){

  vec3 p1 = c0;
  vec3 p2 = c1;
  vec3 p3 = c2;
  vec3 p4 = c3;
  
  vec3 v1 = vec3(0.);
  vec3 v2 = .2  * p1-p3;
  vec3 v3 = .5  * p2-p4;
  vec3 v4 = vec3(0.);

  vec3 v = cubicCurve( amount , v1 , v2 , v3 , v4 );

  return v;


}


void main(){

  vec3 newNormal = normalize( vNormal );

  vec3 nNormal = normalize( vNormalMat * newNormal  );
  vec3 nView = normalize(vView);
  vec3 nReflection = normalize( reflect( vView , nNormal )); 

  vec3 refl = reflect( vLightDir , nNormal );
  float facingRatio = abs( dot(  nNormal, refl) );

  float newDot = dot( normalize( nNormal ), nView );
  float inverse_dot_view = 1.0 - max( newDot  , 0.0);


  vec3 red = vec3( 1. , 0. , 0. );
  vec3 gre = vec3( 0. , 1. , 0. );
  vec3 blu = vec3( 0. , 0. , 1. );



  if( facingRatio > .4 ){
    gl_FragColor = vec4(vec3(1. , 1. , 1.) , 0.0);
  }else{
    gl_FragColor = vec4(0.);//vec4( abs(vec3(refl),  1.0 );
  }

}
