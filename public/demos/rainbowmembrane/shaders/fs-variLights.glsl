const int lights = @LIGHTS;

uniform vec3 lightPositions[ lights ];
uniform vec3 lightColors[ lights ];

uniform sampler2D t_matcap;

varying vec2 vSEM;
varying vec4 vMPos;
varying vec3 vNorm;
varying vec3 vEye;
varying vec3 vCam;

varying vec3 diffuse;

varying mat3 vNormMat;

void main(){

  vec4 matcap = texture2D( t_matcap , vSEM );

  vec3 tCol = vec3( 0. );
  float d = 0.;

  for( int i = 0; i < lights; i++ ){

    vec3 lightDir = normalize(lightPositions[ i ]- vMPos.xyz );
    vec3 camDir = normalize( vCam - vMPos.xyz );
    vec3 n = normalize( vNorm );

    float diffuse = max( 0., dot( n, lightDir ) );
    //d += diffuse;


   // tCol += .1 * diffuse * lightColors[ i ];

    if( diffuse > 0. ) {
      vec3 c = lightColors[ i ];

      vec3 r = reflect( normalize(lightDir) , normalize(vNorm) );

      float eyeMatch =max( 0.  ,dot( normalize( -r), normalize( camDir) ));

      tCol += pow(eyeMatch, 10. )*c;


    }
  }
 
  gl_FragColor = matcap * vec4( tCol , 1. ); //vec4( tCol * matcap.xyz , 1. );


}
