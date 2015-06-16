
function initTones( val ){

  var v = val || 60;

  var tones = [];
 
  var dir = [

    [ 0 ,  0 , -1 ],
    [ 1 ,  0 ,  0 ],
    [-1 ,  0 ,  0 ],
    [ 0 ,  0 ,  1 ],
    [ 0 ,  1 ,  0 ],
    [ 0 , -1 ,  0 ],

  ]

  var loops = [

    //'grant',
    'dark',
    'glory',
    'dark',
    'glory',
    'dark',
    'glory',
    //'grant',
 
  ]

  var numOf = 4;

  for( var i  = 0; i < 6; i++ ){

    for( var j = 0; j < numOf; j++ ){
      for( var k = 0; k < numOf; k++ ){

        var d = dir[i];

        var x= 0,y = 0,z = 0;
        var freq = i 
       
        if( d[0] != 0 ){

          x = d[0] * .3;
          y = (((j+.5) - numOf/2 )/numOf) * .6; 
          z = (((k+.5) - numOf/2 )/numOf) * .6; 


        }else if(  d[1] != 0 ){

          x = (((j+.5) - numOf/2 )/numOf) * .6; 
          y = d[1] * .3;
          z = (((k+.5) - numOf/2 )/numOf) * .6; 

        }else if(  d[2] != 0 ){

          x = (((j+.5) - numOf/2 )/numOf) * .6; 
          y = (((k+.5) - numOf/2 )/numOf) * .6; 
          z = d[2] * .3;

        }


        var v = (j+1) * 20;
        var pos = new THREE.Vector3( x , y , z );


        var num = (j * numOf + k)+1;
        var loop = 'audio/'+loops[i]+ '/'+num+'.mp3';
        neededToLoad++;
        tones.push( new Loop( audioController , loop , .1 , pos ) );

      }


    }


  }


  
  return tones;

}




