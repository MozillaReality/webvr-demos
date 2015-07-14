//spherical matrix functions

THREE.Matrix4.prototype.add = function (m) {
  this.set.apply(this, [].map.call(this.elements, function (c, i) { return c + m.elements[i] }));
};


// function areSameVector(v1, v2) {
//  var delta = 0.001;
//  return v1.dot(v2) < delta;
// }

// function isVectorInArray(mat, vecArray) {
//     for (var i=0; i<vecArray.length; i++) {
//         if (areSameVector(mat, vecArray[i])) {
//             return true;
//         }
//     }
//     return false;
// }

function getFwdVector() {
  return new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);
}
function getRightVector() {
  return new THREE.Vector3(-1,0,0).applyQuaternion(camera.quaternion);
}
function getUpVector() {
  return new THREE.Vector3(0,-1,0).applyQuaternion(camera.quaternion);
}

function quatMult( p , q ) 
{
    var r = new THREE.Vector4();    
    r.w = + p.w*q.w - p.x*q.x - p.y*q.y - p.z*q.z;
    r.x = + p.w*q.x + p.x*q.w + p.y*q.z - p.z*q.y;
    r.y = + p.w*q.y - p.x*q.z + p.y*q.w + p.z*q.x;
    r.z = + p.w*q.z + p.x*q.y - p.y*q.x + p.z*q.w;    
    return r;
}

function quatInv( p ) ///assuming unit quaternion
{
    var r = new THREE.Vector4();    
    r.x = -p.x;
    r.y = -p.y;
    r.z = -p.z;
    r.w = p.w;
    return r;   
}

function makeHopfColorMatrix( colourDir )
{
    //rotate colourDir to lie along (0,0,z,w), fixing (0,0,0,1) 
    //http://math.stackexchange.com/questions/293116/rotating-one-3-vector-to-another
    
    var A = new THREE.Vector3(colourDir.x, colourDir.y, colourDir.z);
    var B = new THREE.Vector3(0.,0.,1.0);
    var X = new THREE.Vector3();
    X.crossVectors(A,B);
    X.normalize();
    var theta = Math.acos( A.dot(B)/(A.length()*B.length())); ///dont care about sign
    var m = new THREE.Matrix4().set(  0.,-X.z, X.y, 0., //input is row vectors
                                     X.z,  0.,-X.x, 0.,
                                    -X.y, X.x,  0., 0.,
                                      0.,  0.,  0., 0.
                        );
    // console.log(m.elements);
    var m2 = new THREE.Matrix4().copy(m).multiply(m);
    m.multiplyScalar(Math.sin(theta));
    m2.multiplyScalar(1.-Math.cos(theta));
    var Rot = new THREE.Matrix4();
    Rot.add(m);
    Rot.add(m2);

    return Rot;
}

// point on geod in S3 from p in direction of q going distance dist
function pointOnS3Geod( p, q, dist )
{
    var P = new THREE.Vector4().copy(p);
    var Q = new THREE.Vector4().copy(q).sub(p.multiplyScalar( p.dot(q) )).normalize();
    //  normalize( q - dot(p,q) * p );
    Q.multiplyScalar(Math.sin(dist)).add(P.multiplyScalar(Math.cos(dist)));
    return Q;
}

function stereoProj(p)
{
	var result = new THREE.Vector3(p.x / (1.0-p.w), p.y / (1.0-p.w), p.z / (1.0-p.w) );
	return result;
}

function invStereoProj(v)
{
	var denom = 1 + v.x*v.x + v.y*v.y + v.z*v.z;
	var result = new THREE.Vector4(2*v.x/denom, 2*v.y/denom, 2*v.z/denom, (denom-2)/denom);
	return result;
}

function S3dist(p,q)
{
    // console.log(p);
	var d = p.dot(q);
	if (d>1.0){
		return 0.0;
	}
	else if (d<-1.0){
		return Math.pi * 0.5;
	}
	else{
		return Math.acos(d);
	}
}

function closePoints(p, listOfPoints, dist){
    var out = [];
    for(var i=0; i<listOfPoints.length; i++){
        if ( Math.abs(S3dist(p, listOfPoints[i]) - dist) < 0.001 ){
            out[out.length] = listOfPoints[i];
        } 
    }
    // console.log(out);
    return out;
}

function makeRotMatrix(points){ //make frame which we will use to rotate tet to right orientation for 5, 16, 600 cells
    //should be four things in points
    var p0 = new THREE.Vector3(points[0].x,points[0].y,points[0].z);
    var p1 = new THREE.Vector3(points[1].x,points[1].y,points[1].z);
    var p2 = new THREE.Vector3(points[2].x,points[2].y,points[2].z);
    var p3 = new THREE.Vector3(points[3].x,points[3].y,points[3].z);

    var fwd = new THREE.Vector3().copy(p0).add(p1).sub(p2).sub(p3);
    var up = new THREE.Vector3().copy(p0).add(p2).sub(p1).sub(p3);
    fwd.normalize();
    up.normalize();
    var right = new THREE.Vector3().copy(fwd).cross(up);
    if (p0.dot(fwd) * p0.dot(up) * p0.dot(right) > 0.0){
        var temp = new THREE.Vector3().copy(right);
        right.copy(up);
        up.copy(temp);
        right.negate(); //rotate 90 degrees
    }
    // var Rot = new THREE.Matrix3().set(fwd.x,fwd.y,fwd.z,
    //                                   up.x, up.y, up.z,
    //                                   right.x,right.y,right.z);
    var Rot = new THREE.Matrix3().set(fwd.x,up.x,right.x,
                                      fwd.y,up.y,right.y,
                                      fwd.z,up.z,right.z);
    // console.log(points);
    // console.log(Rot);
    return Rot;
}

function makeRotMatrixArray(cell_centers, vertices, dist){
    var out = [];
    // console.log('num verts');
    // console.log(vertices.length);
    for (var i=0;i<cell_centers.length;i++){
        // console.log(cell_centers);
        var points = closePoints(cell_centers[i], vertices, dist);

        // console.log(points);
        for (var j=0; j<points.length; j++){
            points[j] = quatMult(quatInv(cell_centers[i]), points[j]); //pull back to vicinity of (0,0,0,1)
        }
        out[out.length] = makeRotMatrix(points);
    }
    // console.log(out);
    return out;
}


