class Firework {
	
	constructor (scene) { 
		this.scene = scene;
		this.fireworks = [];
		this.colors = [];
		this.twinklies = [];
		this.explodeHeights = [];
		this.disappearTimes = [];
	}

	explodeFireworks(index) {

		this.scene.remove( this.fireworks[index] );
		var f = this.fireworks[index];
		var c = this.colors[index];
		
		this.fireworks.splice(index, 1);
		this.colors.splice(index, 1);
		this.explodeHeights.splice(index, 1);

		var [x_val, y_val, z_val] = [f.position.x, f.position.y, f.position.z];

		var t1 = this.makeNewFirework(x_val - 30, y_val, z_val, c);
		this.scene.add( t1 );
		this.twinklies.push(t1);

		var t2 = this.makeNewFirework(x_val - 30, y_val + 30, z_val, c);
		this.scene.add( t2 );
		this.twinklies.push(t2);

		var t3 = this.makeNewFirework(x_val, y_val + 30, z_val, c);
		this.scene.add( t3 );
		this.twinklies.push(t3);

		var t4 = this.makeNewFirework(x_val + 30, y_val + 30, z_val, c);
		this.scene.add( t4 );
		this.twinklies.push(t4);

		var t5 = this.makeNewFirework(x_val + 30, y_val, z_val, c);
		this.scene.add( t5 );
		this.twinklies.push(t5);

		var t6 = this.makeNewFirework(x_val + 30, y_val - 30, z_val, c);
		this.scene.add( t6 );
		this.twinklies.push(t6);

		var t7 = this.makeNewFirework(x_val, y_val - 30, z_val, c);
		this.scene.add( t7 );
		this.twinklies.push(t7);

		var t8 = this.makeNewFirework(x_val - 30, y_val - 30, z_val, c);
		this.scene.add( t8 );
		this.twinklies.push(t8);

		this.disappearTimes.push((Math.floor(((Math.random() - 0.5) * 10)) + 20) * 8);

	}

	disappearFireworks(i) {

		for (var j = 0; j < 8; j++) {
			this.scene.remove( this.twinklies[i+j]);
		}

		this.disappearTimes.splice(i, 1);
		this.twinklies.splice(i * 8, 8);
	}

	makeNewFirework(x, y, z, color) {
		var geometry = new THREE.SphereGeometry( 10, 60, 60 );
		var material = new THREE.MeshBasicMaterial( { color: color } );
		var f = new THREE.Mesh(geometry, material);
		[f.position.x, f.position.y, f.position.z] = [x, y, z];
		return f;
	}

	launchFirework() {

		if (Math.random() > 0.97) {
			var c = new THREE.Color( Math.random() * 0xffffff )
			var firework = this.makeNewFirework((Math.random() - 0.5) * 2000, 0, -1000, c);

			this.fireworks.push(firework);
			this.colors.push(c);
			this.explodeHeights.push((Math.random() - 0.5) * 400 + 800);

			this.scene.add( firework );
		}

	}

	moveFireworks() {

		for (var i = 0 ; i < this.fireworks.length ; i++) {
			if (this.fireworks[i].position.y > this.explodeHeights[i]) {
				this.explodeFireworks(i);
			} else {
				this.fireworks[i].position.y += 10;
			}
		}

		for (var i = 0; i < this.twinklies.length ; i++) {
			if (i % 8 == 0) {
				this.twinklies[i].position.x -= 10;
			} else if (i % 8 == 1) {
				this.twinklies[i].position.x -= 10;
				this.twinklies[i].position.y += 10;
			} else if (i % 8 == 2) {
				this.twinklies[i].position.y += 10;
			} else if (i % 8 == 3) {
				this.twinklies[i].position.x += 10;
				this.twinklies[i].position.y += 10;
			} else if (i % 8 == 4) {
				this.twinklies[i].position.x += 10;
			} else if (i % 8 == 5) {
				this.twinklies[i].position.x += 10;
				this.twinklies[i].position.y -= 10;
			} else if (i % 8 == 6) {
				this.twinklies[i].position.y -= 10;
			} else if (i % 8 == 7) {
				this.twinklies[i].position.x -= 10;
				this.twinklies[i].position.y -= 10;
			}

			var k = (i - (i % 8)) / 8;
			this.disappearTimes[k] -= 1;
		}

		for (var i = 0; i < this.disappearTimes.length; i++) {
			if (this.disappearTimes[i] <= 0) {
				this.disappearFireworks(i);
			}
		}

	}

}

  