class River {

	constructor (scene, speed = 10) {
		var texture = new THREE.TextureLoader().load( "textures/water.jpg" );
		var geometry = new THREE.PlaneGeometry(200, 3000, 100, 100);
		geometry.rotateX( - Math.PI / 2 );

		var material = new THREE.MeshBasicMaterial( { map: texture } );
		var floor = new THREE.Mesh( geometry, material );

		this.n = new Noise();
		this.geometry = geometry;

		this.stagger = speed;
		this.speed = speed;

		scene.add(floor);
	}

	updateRiver () {
		this.stagger += 1;
		if (this.stagger > this.speed) {
			this.geometry.verticesNeedUpdate = true;
			this.geometry.vertices.forEach(function (v) {
				// takes the date function into account for updating.
				v.y = parseInt(this.n.perlin(v.x/100, Date.now()/100, v.z/100) * 50 - 70);
			}.bind(this));
			this.stagger = 0;
		}
	}
}


