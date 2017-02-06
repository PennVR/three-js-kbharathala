class Terrain {

	constructor () {
		var texture = new THREE.TextureLoader().load( "textures/fire.jpg" );

		var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
		geometry.rotateX( - Math.PI / 2 ) ;

		var n = new Noise();

		geometry.vertices.forEach(function (v) {
			v.y = parseInt(n.perlin(v.x/100, v.y/100, v.z/100) * 100 - 50);
		});

		var material = new THREE.MeshBasicMaterial( { map:texture } );
		this.floor = new THREE.Mesh( geometry, material );
	}
	
}


