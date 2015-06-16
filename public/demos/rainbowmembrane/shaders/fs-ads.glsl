
  uniform vec3 ambientLightColor;
  uniform vec3 diffuseLightColor;
  uniform vec3 specularLightColor;

  uniform vec3 ambientMaterialColor;
  uniform vec3 diffuseMaterialColor;
  uniform vec3 specularMaterialColor;

  uniform vec3 lightPosition;
  uniform float shininess;

  varying vec3 vNorm;
  varying vec3 vPos;

  $ADSLightModel

  void main(){

    vec3 color = ADSLightModel( vNorm , vPos , cameraPosition );
    gl_FragColor = vec4( color , 1.0 );

  }

