uniform float time;
uniform vec3 lightPos;

varying vec3 vView;
varying vec3 vNormal;
varying vec2 vUv;

varying mat3 vNormalMat;
varying vec3 vLightDir;
varying float vDisplacement;

$simplex



// TODO: make there be different 'wind directions
// for each individual noise size
float fractNoise( vec2 p , vec2 o ){

  p.x *= 3.;

  float s1 = snoise( p * 1.01 + o * .5  );
  float s2 = snoise( p * 10.1 + o * .3 );
  float s3 = snoise( p * 39.5 + o * .5  );

  //return( s1 *20.);
  return (s1 * .9 + s2*.3 + s3*.1) * 10.; //+ s2*.3 + s3*.5;

}


vec3 getNormal( vec2 p , vec2 o ){

  vec2 upXLookup = p + vec2( 0.001 , 0.0 );
  vec2 doXLookup = p - vec2( 0.1 , 0.0 );
  vec2 upYLookup = p + vec2( 0.0 , 0.1 );
  vec2 doYLookup = p - vec2( 0.0 , 0.1 );

  float upX = fractNoise( upXLookup , o );
  float doX = fractNoise( doXLookup , o );
  float upY = fractNoise( upYLookup , o );
  float doY = fractNoise( doYLookup , o );

  vec3 a1 = vec3( upXLookup , upX );
  vec3 a2 = vec3( doXLookup , doX );
  vec3 b1 = vec3( upYLookup , upY );
  vec3 b2 = vec3( doYLookup , doY );

  vec3 a = a2 - a1;
  vec3 b = b2 - b1;

  vec3 n = cross( a , b );

  return normalize(n);

}

void main(){

  vUv = uv;
  vec3 pos = position;
  vec2 offset = vec2( time , 0. );

  float displacement = fractNoise( vUv , offset );
  vNormal = getNormal( vUv , offset );

  pos = position + vec3( 0. , 0. , displacement );

  vView = modelViewMatrix[3].xyz;
  vNormalMat = normalMatrix;


  vDisplacement = displacement;
  vLightDir = normalize(vView - lightPos);

  vec4 mvPos = modelViewMatrix * vec4( pos , 1.0 );
  gl_Position = projectionMatrix * mvPos;

}
