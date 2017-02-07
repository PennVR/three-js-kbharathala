class Firework {
	
	constructor () { 
		this.geometry = new THREE.SphereGeometry( 10, 60, 60 );
    	this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    	this.fireworks = []
    	this.heightToStop = 0;
    	this.NUMBER_OF_FIREWORKS = 5;
	}

	generateFireworks() {

		var x_val = (Math.random() - 0.5) * 2000;
		this.heightToStop = (Math.random() - 0.5) * 200 + 700;
		for (var i = 0; i < this.NUMBER_OF_FIREWORKS; i++) {
			var mesh = new THREE.Mesh(this.geometry, this.material);
			mesh.position.x = x_val;
			mesh.position.y = 0;
			mesh.position.z = -1000;
			scene.add(mesh);

			this.fireworks.push(mesh);
  		}
	}

	moveFirework() {

		if (this.fireworks[0].position.y > this.heightToStop) {
			var new_x = (Math.random() - 0.5) * 2000;
			this.fireworks.forEach(function (f) {
		      f.position.y = 0;
		      f.position.x = new_x;
		    });
		    this.heightToStop = (Math.random() - 0.5) * 200 + 700;

		} else {
		    this.fireworks.forEach(function (f) {
		      f.position.y += 10;
		    });
		}

	}

}

  