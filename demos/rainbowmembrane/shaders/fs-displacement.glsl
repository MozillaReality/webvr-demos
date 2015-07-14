varying vec3 vNorm;
varying vec3 vPos;
varying float vDisplacement;

void main(){



  gl_FragColor = vec4( abs(vDisplacement * vNorm) , 1.0 );

}
